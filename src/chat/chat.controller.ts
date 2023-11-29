import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() data: CreateChatDto) {
    return this.chatService.create(data);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Get('user-chats/:id')
  findUserChats(@Param('id') id: string) {
    return this.chatService.userChats(id);
  }

 
}
