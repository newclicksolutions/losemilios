import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class OrderGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
    
    }
  
    notifyNewOrder(order: any) {
      this.server.emit('newOrder', order); // Evento que se enviará al frontend
    }
  }