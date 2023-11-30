import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[PrismaModule, AuthModule, UsersModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports:[ChatService]
})
export class ChatModule {}
