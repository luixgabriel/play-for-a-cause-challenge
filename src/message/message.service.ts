import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService, private chatService: ChatService){}
  async create(data: CreateMessageDto) {
    try {
      const message = await this.prisma.message.create({
        data,
      });
      await this.chatService.updateLastMessage(data.chatId, data.content)
      return message
    } catch (error) {
      console.log(error);
      throw new HttpException('Erro ao enviar mensagem, tente novamente.', HttpStatus.FORBIDDEN);
    }
  }

  async findAllWithChatId(chatId: string) {
    try {
     const messages = await this.prisma.message.findMany({
        where: {
          chatId
        }
      })
      return messages
    } catch (error) {
      console.error(error)
      throw new HttpException('Erro na solicitação, tente novamente.', HttpStatus.FORBIDDEN);
    }
  }
}
