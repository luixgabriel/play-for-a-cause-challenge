import { Message } from '@prisma/client';
import {
    IsArray,
    IsDate,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateChatDto {
    @IsString()
    @IsOptional()
    id: string;
  
    @IsArray()
    participants: string[];
  
    @IsArray()
    @IsOptional()
    Messages: Message[]
  
    @IsString()
    @IsOptional()
    lastMessage: string;
  
    @IsDate()
    @IsOptional()
    createdAt: Date;
  }
  