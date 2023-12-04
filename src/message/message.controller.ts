import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({summary: 'Criar uma nova mensagem.'})
  @ApiResponse({status: 201, description: 'Mensagem criada com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro ao enviar mensagem, tente novamente.'})
  create(@Body() data: CreateMessageDto) {
    return this.messageService.create(data);
  }

  @Get('chat/:id')
  @ApiOperation({summary: 'Listar todas as mensagems de um chat específico por id.'})
  @ApiResponse({status: 200, description: 'Mensagens listadas com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro na solicitação, tente novamente.'})
  findAllWithChatId(@Param('id') id: string) {
    return this.messageService.findAllWithChatId(id);
  }

 
}
