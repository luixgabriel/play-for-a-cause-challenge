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
    async handleMessageNew( @ConnectedSocket() client: Socket, @MessageBody() userId: string) {
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

    // @SubscribeMessage('addNewUser')
    // addNewUser(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    //   //this.server.emit('addNewUser', userId);
    //   this.onlineUsers.push({id: userId, name: "vasco"})
    //   this.server.emit("getUsers", this.onlineUsers) // Broadcast the message to all connected clients
    // }

   
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      console.log(data)
      console.log(client.id)
      this.server.emit('message', data); // Broadcast the message to all connected clients
    }

    @SubscribeMessage('getMessage')
    getMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
      console.log(data)
      console.log(client.id)
      const messages = ['oi', 'tudo bem', 'com vc']
      this.server.emit('getMessage', messages); // Broadcast the message to all connected clients
    }

}