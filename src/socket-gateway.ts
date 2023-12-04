import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { MessageService } from "./message/message.service";
import { UsersService } from "./users/users.service";


@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private messageService: MessageService, private usersService: UsersService){
      this.onlineUsers = [];
    }
    @WebSocketServer()
    server: Server;
    private onlineUsers: any[]
    
    handleConnection(client: Socket) {
     console.log(client.id)
    }
 
    handleDisconnect(client: Socket) {
      this.onlineUsers = this.onlineUsers.filter((user) => user.socketId !== client.id);
      this.server.emit("getUsers", this.onlineUsers)
      client.disconnect(true)
    }

    @SubscribeMessage('getUsers')
    async handleOnlineUsers( @ConnectedSocket() client: Socket, @MessageBody() userId: string) {
      const user = await this.usersService.findOne(userId)
      if (!this.onlineUsers.some(u => u.id === userId)) {
        this.onlineUsers.push({
          user,
          socketId: client.id
        });
        this.server.emit("getUsers", this.onlineUsers);
      }
    
      this.server.emit("getUsers", this.onlineUsers)
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() data:{content: string, receiverId: string, senderId: string, chatId: string}) {
   
      await this.messageService.create({senderId: data.senderId, content: data.content, chatId: data.chatId})
      const user = this.onlineUsers.find(
        (item) => item.user.id === data.receiverId
      );
     if(user){
      this.server.emit('sendMessage', data); 
     }
    }

  

}