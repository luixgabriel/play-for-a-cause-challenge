import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger'
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import {v2 as cloudinary} from 'cloudinary';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


cloudinary.config({ 
  cloud_name: process.env.CLOUD_API_HOST, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('image', 
  {
    storage: diskStorage({
      destination: join(__dirname, '..', '..', 'storage'),
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  @Post()
  @ApiOperation({summary: 'Criar um novo usuário.'})
  @ApiResponse({status: 201, description: 'Usuário criado com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro ao registrar usuário, tente novamente.'})
  async create(@Body() data: CreateUserDto, @UploadedFile() image: Express.Multer.File) {
    if(image){
      const imageUpload = await cloudinary.uploader.upload(image.path)
      return this.usersService.create({...data, imageUrl: imageUpload.url});
    }else{
     return this.usersService.create(data);
    }
  }

  @Get()
  @ApiOperation({summary: 'Listar todos os usuários.'})
  @ApiResponse({status: 200, description: 'Usuários listados com sucesso.'})
  @ApiResponse({status: 403, description: 'Erro na solicitação, tente novamente.'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Usuário listado com sucesso.'})
  @ApiResponse({status: 404, description: 'Esse usuário não existe no banco de dados.'})
  @ApiOperation({summary: 'Listar um usuário específico por id.'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

}
