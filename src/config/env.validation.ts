import { plainToClass } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  validateSync,
  IsBoolean,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsOptional()
  @IsString()
  JWT_EXPIRES_IN?: string;

  @IsOptional()
  @IsNumber()
  PORT?: number;

  @IsOptional()
  @IsString()
  NODE_ENV?: string;

  @IsOptional()
  @IsString()
  LOG_LEVEL?: string;

  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string;

  @IsOptional()
  @IsNumber()
  RATE_LIMIT_TTL?: number;

  @IsOptional()
  @IsNumber()
  RATE_LIMIT_LIMIT?: number;

  @IsOptional()
  @IsNumber()
  DB_POOL_SIZE?: number;

  @IsOptional()
  @IsNumber()
  DB_CONNECTION_TIMEOUT?: number;

  @IsOptional()
  @IsNumber()
  DB_QUERY_TIMEOUT?: number;

  @IsOptional()
  @IsBoolean()
  DB_SSL_ENABLED?: boolean;

  @IsOptional()
  @IsBoolean()
  DB_SSL_REJECT_UNAUTHORIZED?: boolean;

  @IsOptional()
  @IsBoolean()
  TYPEORM_SYNCHRONIZE?: boolean;

  @IsOptional()
  @IsBoolean()
  TYPEORM_LOGGING?: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
