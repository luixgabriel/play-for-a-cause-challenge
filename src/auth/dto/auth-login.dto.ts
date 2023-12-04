import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class AuthLoginDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
