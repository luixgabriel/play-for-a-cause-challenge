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
      }, include: {
        Messages:true,
        participants: true
      },
    })
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

  async check(id: string){
    try {
      return await this.prisma.chat.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Esse chat não existe no banco de dados.', HttpStatus.NOT_FOUND)
    }
  }

  async updateLastMessage(id: string, lastMessage: string){
    if(!await this.check(id)) throw new HttpException('Esse chat não existe no banco de dados.', HttpStatus.NOT_FOUND)
    try {
     const comment = await this.prisma.chat.update({where: {
       id
     }, data: {
      lastMessage
     }})
     return comment
     } catch (error) {
      throw new HttpException('Esse chat não existe no banco de dados.', HttpStatus.NOT_FOUND)
     }
  }

  }

