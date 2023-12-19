import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
export class Pagination {
  @IsNumber()
  @IsOptional()
  skip: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  take: number;
}
