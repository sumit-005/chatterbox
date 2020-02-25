import { ChatService } from '../shared/chat.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private socket = io('https://chatterbox-005.herokuapp.com');
  constructor() { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  createChannel(data) {
    this.socket.emit('joinChannel', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }
  sendChannelMessage(data) {
    this.socket.emit('channelmessage', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: string, message: string, time: string}>(observer => {
      this.socket.on('new message', (data) => {
        console.log(data);

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newChannelMessageReceived() {
    const observable = new Observable<{ user: string, message: string, time: string}>(observer => {
      this.socket.on('new message1', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
