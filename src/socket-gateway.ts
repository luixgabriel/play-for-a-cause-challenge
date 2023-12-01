import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { MessageService } from "./message/message.service";


@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private messageService: MessageService){
      this.onlineUsers = [{id: '1', name: "luix"}];
    }
    @WebSocketServer()
    server: Server;
    private onlineUsers: any[]
    
    handleConnection(client: Socket) {
     console.log(client.id)
    }
 
    handleDisconnect(client: Socket) {
      console.log(client.id)
      client.disconnect(true)
    }

    @SubscribeMessage('getUsers')
    handleMessageNew(client: Socket, @MessageBody() userId: string): void {
      console.log(this.onlineUsers)
      // !this.onlineUsers.some((user) => user.id === userId) &&
      //  this.onlineUsers.push({
      //   id: userId,
      //   socketId: client.id,
      // });
      this.onlineUsers.push({id: userId, name: "vasco"})
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