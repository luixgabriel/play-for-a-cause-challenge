import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
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
      const data = this.jwtService.verify(token, { issuer: 'bolhadev-help' });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(data: AuthLoginDTO) {
    return data;
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
