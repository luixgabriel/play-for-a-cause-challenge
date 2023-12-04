import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  createdAt: Date;

}
