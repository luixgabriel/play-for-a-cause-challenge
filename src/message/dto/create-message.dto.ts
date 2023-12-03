import { IsOptional, IsString } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsOptional()
    id?: string

    @IsString()
    senderId: string

    @IsString()
    chatId: string

    @IsString()
    content: string
}
