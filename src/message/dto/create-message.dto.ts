import { IsOptional, IsString } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'

export class CreateMessageDto {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    id?: string

    @IsString()
    @ApiProperty()
    senderId: string

    @IsString()
    @ApiProperty()
    chatId: string

    @IsString()
    @ApiProperty()
    content: string
}
