import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ChatGateway } from './socket-gateway';
import { MessageService } from './message/message.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, AuthModule, ChatModule, MessageModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway, MessageService],
})
export class AppModule {}
