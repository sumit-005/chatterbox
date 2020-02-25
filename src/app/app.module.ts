import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChannelComponent } from './channel/channel.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ChatComponent,
    ChatroomComponent,
    SelectComponent,
    ChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
     NgSelectModule ,
    ModalModule.forRoot()
    // ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
