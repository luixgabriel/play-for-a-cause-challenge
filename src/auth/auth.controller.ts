import { Controller, Post, Body, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import {v2 as cloudinary} from 'cloudinary';
import { AuthRegisterDTO } from './dto/auth-register.dto';


cloudinary.config({ 
  cloud_name: process.env.CLOUD_API_HOST, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({summary: 'Fazer login na aplicação.'})
  @ApiResponse({status: 200, description: 'Login feito com sucesso.'})
  @ApiResponse({status: 401, description: 'E-mail e/ou senha incorretos.'})
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
  @ApiOperation({summary: 'Fazer Registro na aplicação.'})
  @ApiResponse({status: 200, description: 'Usuário registrado com sucesso.'})
  @ApiResponse({status: 500, description: 'Erro ao criar usuário, tente novamente.'})
  async register(@Body() data: AuthRegisterDTO, @UploadedFile() image: Express.Multer.File) {
    if(image){
      const imageUpload = await cloudinary.uploader.upload(image.path)
      return this.authService.register({...data, imageUrl: imageUpload.url});
    }else{
     return this.authService.register(data);
    }
  }
}
