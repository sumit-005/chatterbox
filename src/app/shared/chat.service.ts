import {
  HttpClientModule,
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  private userData = new Subject<any>();

  reLoad$ = this.userData.asObservable();

  private channelData = new Subject<any>();

  reLoad = this.channelData.asObservable();

  refresh(name) {
    this.userData.next(name);

  }

  refresh1(channelname) {
    this.channelData.next(channelname);

  }

  getLoggedInUser() {
    return localStorage.getItem('username');
  }

  getUsers() {
    return this.http.get('https://chatterbox-005.herokuapp.com/api/users');
  }

  getChannels() {
    return this.http.get('https://chatterbox-005.herokuapp.com/channels');
  }
  getUserName() {
    return this.http.get('https://chatterbox-005.herokuapp.com/api/sk/users');
  }

  getChatRoomsChat(chatRoom) {
    return this.http.get('https://chatterbox-005.herokuapp.com/chatroom/' + chatRoom);
  }


  getChatChannelChat(chatRoom) {
    return this.http.get('https://chatterbox-005.herokuapp.com/channels/' + chatRoom);
  }



}
