import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  check;
  isLoading = false ;


  constructor( private authService: AuthService) { }

  ngOnInit() {
  this.check = false;

  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(form.value);
  }

}
