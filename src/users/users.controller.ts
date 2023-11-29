import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
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
  create(@Body() data: CreateUserDto, @UploadedFile() image: Express.Multer.File) {
    return this.usersService.create(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
