import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService){}
  create(data: CreateChatDto) {
    return this.prisma.chat.create({
      data:{
        participants: {
          connect: [{id: data.participants[0]}, {id: data.participants[1]}]
        },
      }
    })
  }

  findAll() {
    return this.prisma.chat.findMany({
      include: {
        participants: true
      }
    })
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.chat.findFirstOrThrow({where:{
        id
      }})
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Esse chat não existe no banco de dados.', HttpStatus.NOT_FOUND)
    }
  
  }

  async userChats(id: string){
    try {
      const chats = await this.prisma.chat.findMany({
        where: {
          participants: {
            some: {
              id
            },
          },
        },
      });
      return chats
    } catch (error) {
      console.log(error)
      throw new HttpException('Esse chat não existe no banco de dados.', HttpStatus.NOT_FOUND)
    }
  }
}
