import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
   }

  // sendMessage(msg: string){
  //   this.socket.emit("message", msg);
  // }
  // getMessage() {
  //     return this.socket
  //         .fromEvent("message")
  //         .pipe(map((data) => data.msg));
  // }

  checkStatus(){

    this.socket.on('connect', () =>{
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () =>{
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  emit ( evento: string, payload?: any, callback?: Function ){

    console.log('Emitiendo', evento);
    // emit('EVENTO, payload, callback)
    this.socket.emit( evento, payload, callback );

  }

  listen( evento: string ){
    return this.socket.fromEvent( evento );
  }

}
