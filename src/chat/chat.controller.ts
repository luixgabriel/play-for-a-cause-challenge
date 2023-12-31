import { Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger'
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from '../guards/auth.guard';


@Controller('chat')
@ApiTags('Chat')
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({summary: 'Criar um novo chat.',})
  @ApiResponse({status: 201, description: 'Chat criado com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro ao enviar mensagem, tente novamente.'})
  @ApiResponse({status: 404, description: 'Esse usuário não existe no banco de dados.'})
  @ApiResponse({status: 404, description: 'Já existe um chat com esse usuário.'})
  @ApiResponse({status: 403, description: 'Erro na solicitação, tente novamente.'})
  @ApiResponse({status: 401, description: 'Rota não autorizada, Por favor envie o token.'})
  create(@Body() data: CreateChatDto) {
    return this.chatService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary: 'Listar todos os chats.'})
  @ApiResponse({status: 200, description: 'Chats listados com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro na solicitação, tente novamente.'})
  @ApiResponse({status: 401, description: 'Rota não autorizada, Por favor envie o token.'})
  findAll() {
    return this.chatService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'Listar um chat específico por id.'})
  @ApiResponse({status: 200, description: 'Chat listado com sucesso.'})
  @ApiResponse({status: 404, description: 'Esse chat não existe no banco de dados.'})
  @ApiResponse({status: 401, description: 'Rota não autorizada, Por favor envie o token.'})
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('user-chats/:id')
  @ApiResponse({status: 200, description: 'Chat listados com sucesso.'})
  @ApiResponse({status: 404, description: 'Esse chat não existe no banco de dados.'})
  @ApiResponse({status: 401, description: 'Rota não autorizada, Por favor envie o token.'})
  @ApiOperation({summary: 'Listar todos os chats de um usuário específico por id.'})
  findUserChats(@Param('id') id: string) {
    return this.chatService.userChats(id);
  }

 
}
