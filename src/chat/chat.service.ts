import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private userService: UsersService){}
  async create(data: CreateChatDto) {
    const user1 = await this.userService.findOne(data.participants[0])
    const user2 = await this.userService.findOne(data.participants[1])

    if(await this.isChatExists(user1, user2)) throw new HttpException('Já existe um chat com esse usuário.', HttpStatus.BAD_REQUEST)
   
    return this.prisma.chat.create({
      data:{
        participants: {
          connect: [{id: user1.id}, {id: user2.id}]
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
       select:{
        id: true,
        lastMessage:true,
        createdAt:true,
        participants: {
          select:{
            id: true,
            name: true,
            imageUrl: true
          }
        },
        Messages: true
          
       },
       orderBy: {
        updatedAt: 'desc'
       }
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
  async isChatExists(user1, user2){
    const chatExists = await this.prisma.chat.findFirst({
      where: {
        AND: [
          { participants: { some: { id: user1.id } } },
          { participants: { some: { id: user2.id } } },
        ],
      },
    });
    
    return !!chatExists;
  }

  }

