import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/user.entity';
import { validate } from './config/env.validation';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { DatabaseHealthService } from './common/health/database-health.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.get<number>('RATE_LIMIT_TTL', 60_000),
            limit: config.get<number>('RATE_LIMIT_LIMIT', 100),
          },
        ],
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error(
            'DATABASE_URL is not defined in environment variables',
          );
        }

        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          type: 'postgres' as const,
          url: databaseUrl,
          entities: [User],
          migrations: [__dirname + '/../database/migrations/*.ts'],
          migrationsRun: isProduction, // Only run migrations in production
          synchronize:
            (!isProduction &&
              configService.get<boolean>('TYPEORM_SYNCHRONIZE')) ??
            false,
          logging: configService.get<boolean>('TYPEORM_LOGGING') ?? false,
          ssl: isProduction
            ? {
                rejectUnauthorized:
                  configService.get<boolean>('DB_SSL_REJECT_UNAUTHORIZED') ??
                  false,
              }
            : false,
          extra: {
            connectionLimit: configService.get<number>('DB_POOL_SIZE') ?? 10,
            connectTimeout:
              configService.get<number>('DB_CONNECTION_TIMEOUT') ?? 30000,
            acquireTimeout:
              configService.get<number>('DB_QUERY_TIMEOUT') ?? 10000,
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseHealthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
