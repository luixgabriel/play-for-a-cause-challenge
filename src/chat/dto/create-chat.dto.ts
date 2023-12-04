import { Message } from '@prisma/client';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import {
    IsArray,
    IsDate,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateChatDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    id: string;
  
    @IsArray()
    @ApiProperty()
    participants: string[];
  
    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
    Messages: Message[]
  
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    lastMessage: string;
  
    @IsDate()
    @IsOptional()
    @ApiProperty()
    createdAt: Date;
  }
  