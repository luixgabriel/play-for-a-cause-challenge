import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() data: AuthLoginDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }
}
