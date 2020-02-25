import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './shared/Auth.guard';


const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : '', component: NavbarComponent},
  {path : 'chatroom', component: ChatroomComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path : '**', redirectTo: 'login' , pathMatch: 'full'},
  {path : '',  redirectTo: '/login' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
