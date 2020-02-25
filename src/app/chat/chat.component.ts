import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  Users;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUsers().subscribe(users => {
      this.Users = users;
    });
  }

  getUser() {
    return this.chatService.getLoggedInUser();
  }

  sendData(data){
    this.chatService.refresh(data);
  }
}
