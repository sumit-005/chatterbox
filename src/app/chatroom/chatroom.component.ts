import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../shared/chat.service';
import { WebsocketService } from '../shared/websocket.service';
import * as moment from 'moment';
declare  var jQuery: any;

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})


export class ChatroomComponent implements OnInit {
  public username: any;
  public channelBox: any;
  public email: any;
  public chatroom;
  public message: any;
  messageArray ;
  channelmessageArray ;
  public isTyping = false;
  sk = false;
  check = false;
  flag = 0;
  chat: any = [];
  channelName: any;


  constructor(
    public route: ActivatedRoute,
    public webSocketService: WebsocketService,
    public chatService: ChatService,
    public router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {

      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.newChannelMessageReceived().subscribe(data => {

      this.channelmessageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  ngOnInit() {


    this.username = this.chatService.reLoad$.subscribe((user) => {
      this.flag = 0;
      this.sk = true;
      this.username = user;
      const currentUser = this.chatService.getLoggedInUser();

      if ( currentUser < this.username) {
      this.chatroom = currentUser.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser);
    }
      this.webSocketService.joinRoom({user: this.chatService.getLoggedInUser(), room: this.chatroom});
      this.chatService.getChatRoomsChat(this.chatroom).subscribe(messages => {
        this.chat = messages;
        if (this.chat.chatroom.length > 0) {
        this.messageArray = this.chat.chatroom[0].messages;
        }

    });
  });


    this.channelBox = this.chatService.reLoad.subscribe((name) => {

   this.flag = 1;
   this.sk = true;
   this.channelName = name;


   this.chatService.getChatChannelChat(this.channelName).subscribe(messages => {
      this.chat = messages;
      if (this.chat.chatroom.length > 0) {
      this.channelmessageArray = this.chat.chatroom[0].messages;
      }

  });
});







  }

  change(event){
    console.log("Sdfsdf");

    this.check = true;
  }
  sendMessage() {
    console.log(this.message);
    if(this.message == '' || this.message !== undefined){
    const currentTime = moment().format('hh:mm a');
    this.webSocketService.sendMessage({room: this.chatroom, user: this.chatService.getLoggedInUser(),
      message: this.message, time: currentTime});
    this.message = '';
  }
  }

  sendChannelMessage() {
    if(this.message == '' || this.message !== undefined){
    const currentTime = moment().format('hh:mm a');
    this.webSocketService.sendChannelMessage({room: this.channelName, user: this.chatService.getLoggedInUser(),
       message: this.message, time: currentTime});
    this.message = '';
    }
  }

  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.chatService.getLoggedInUser()});
  }





}
