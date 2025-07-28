import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Product } from './products/entities/product.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_NAME', 'uventory'),
  entities: [User, Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
});
