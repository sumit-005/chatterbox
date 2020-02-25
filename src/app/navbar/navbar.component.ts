import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ChatService } from '../shared/chat.service';
import { NgForm } from '@angular/forms';
import { format } from 'url';
import { WebsocketService } from '../shared/websocket.service';

declare  var jQuery: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy {
  public userIsAuthenticated = false;
  private authListnerSubs: Subscription;
  message: string;
  name: string;
  public Users;
  public sk: any = [];
  public rohanNoob = [];
  public value: string[];
  public Channels;
  public rooms=[];


  checkboxes: any = [];
  names: any = [];
  chatroom: string;

  constructor(public authService: AuthService,
              public chatService: ChatService,
              public webSocketService: WebsocketService,
    ) { }
  selectedPeople = [];



  people$: Observable<any[]>;
  ngOnInit() {



    this.people$ = this.sk;


    // tslint:disable-next-line: only-arrow-functions
    (function($) {
      $(document).ready(function() {

        $('#sidebarCollapse').on('click', function() {
            $('#sidebar, #content').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });
    })(jQuery);


    this.chatService.getUsers().subscribe(users => {
      this.Users = users;

      this.Users.forEach(element => {
        if (element.username === this.chatService.getLoggedInUser()){
        for (let i = 0; i < element.room.length; i++) {
          this.rooms.push(element.room[i]);

        }
      }

      });



      // for (let i = 0; i < this.Users.length; i++) {

      //   this.sk[i] = {
      //     id: i,
      //     name: this.Users[i].username

      //   };


      // }

    });
    // console.log(this.sk);

    // console.log(this.cities2);


    this.chatService.getChannels().subscribe(channels => {

      this.Channels = channels;


    });

    this.name = localStorage.getItem('username');
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      // console.log(this.userIsAuthenticated);

  }

   getUser() {
    return this.chatService.getLoggedInUser();
  }

  sendData(data) {
    this.chatService.refresh(data);
  }

  sendChannelMessage(channelname) {
    this.chatService.refresh1(channelname);
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

  addUsers(data: NgForm) {


    if (data.invalid) {
      return true;
    }
    console.log( data.value.channelname, this.names);

    const currentUser = this.chatService.getLoggedInUser();

    this.names.push(currentUser);


    this.webSocketService.createChannel({admin: currentUser, room: data.value.channelname , users: this.names});
    // this.chatService.getChatRoomsChat(this.chatroom).subscribe(messages => {
    //     this.chat = messages;
    //     if (this.chat.chatroom.length > 0) {
    //     this.messageArray = this.chat.chatroom[0].messages;
    //     }

    // });

    data.reset();

    this.names = [];



  }

  checkbox(name, data1) {
    if (data1 === true) {
      this.names.push(name);
    } else {
      this.names.splice(this.names.indexOf(name), 1);
    }
  }




}

