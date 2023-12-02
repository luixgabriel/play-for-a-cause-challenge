import { Controller, Post, Body, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
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
  async register(@Body() data: AuthRegisterDTO, @UploadedFile() image: Express.Multer.File) {
    if(image){
      const imageUpload = await cloudinary.uploader.upload(image.path)
      return this.authService.register({...data, imageUrl: imageUpload.url});
    }else{
     return this.authService.register(data);
    }
  }
}
