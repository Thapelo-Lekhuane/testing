import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsUUID()
  @IsNotEmpty()
  unitId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
