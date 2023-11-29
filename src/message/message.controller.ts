import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() data: CreateMessageDto) {
    return this.messageService.create(data);
  }

  @Get('chat/:id')
  findAll(@Param('id') id: string) {
    return this.messageService.findAllWithChatId(id);
  }

 
}
