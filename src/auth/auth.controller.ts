import { Controller, Post, Body, UseInterceptors, } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
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

  
  @UseInterceptors(FileInterceptor('image', 
  {
    storage: diskStorage({
      destination: join(__dirname, '..', '..', 'storage'),
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }
}
