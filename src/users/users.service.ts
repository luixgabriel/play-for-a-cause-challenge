import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto) {
  
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    try {
      const user = await this.prisma.user.create({
        data,
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException('Erro ao registrar usuário, tente novamente.', HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          chats: true,
          messages: true,
          createdAt: true,
        }
      })
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Erro na solicitação, tente novamente.', HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({where:{
        id
      }})
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Esse usuário não existe no banco de dados.', HttpStatus.NOT_FOUND)
    }
  
  }

  async check(id: string){
    try {
      return await this.prisma.user.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Esse usuário não existe no banco de dados.', HttpStatus.NOT_FOUND)
    }
  }
}
