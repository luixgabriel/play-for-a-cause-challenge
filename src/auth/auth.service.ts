import { Injectable, BadRequestException, HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService
  ) {}

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
      },
      {
        expiresIn: '7 days',
        issuer: 'play-for-a-cause',
      },
    );
    return {
      token: token,
      id: user.id,
      name: user.name,
    };
  }
  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, { issuer: 'play-for-a-cause' });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(data: AuthLoginDTO){
    try {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: data.email
            }
        })
        if(!user) throw new HttpException('E-mail e/ou senha incorretos.', HttpStatus.UNAUTHORIZED)

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }
        return this.createToken(user)
        
    } catch (error) {
      throw new HttpException('E-mail e/ou senha incorretos.', HttpStatus.UNAUTHORIZED)
    }
   
}

  async register(data: AuthRegisterDTO) {
    try {
      const user = await this.userService.create(data);
    return this.createToken(user);
    } catch (error) {
      throw new HttpException('Erro ao criar usuário, tente novamente.',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }
}
