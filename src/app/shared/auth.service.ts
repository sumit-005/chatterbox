import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Subject, from, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import {CookieService} from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private authStatusListner = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  private tokenTimer: any;
  private userId: string;
  private mainToken: any;
  public cookieValue: string;
  public userName: string;
  public headers = new HttpHeaders();


  constructor(private http: HttpClient, private router: Router,
              // private toastr: ToastrService
              ) {}


  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getUserName() {
    return this.userName;
  }


  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }


  createUser(data) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http
      .post('https://chatterbox-005.herokuapp.com/api/users', data)
      .subscribe(() => {
        // this.toastr.success(`User Created Succesfully`, 'Success');
        this.router.navigate(['login']);
      }, error => {
        this.authStatusListner.next(false);
        this.router.navigate(['register']);
        // this.toastr.error(`Your email id is already taken`, 'Error');

      });
  }
  login(data) {

    this.http
      .post<{ token: string; username: string; expiresIn: number; userId: string  }>(
        'https://chatterbox-005.herokuapp.com/api/login',
        data
      )
      .subscribe(response => {
        localStorage.setItem('isLoggedIn', 'true');
        this.userName = response.username;
        localStorage.setItem('username' , this.userName);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTime(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListner.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          this.saveAuthData(token, expirationDate, this.userId);
          // this.toastr.success(this.userName , 'Welcome');
          this.router.navigate(['']);
        }
      }, error => {

        this.authStatusListner.next(false);
        // this.toastr.error(`Please check your email Id and Passsword`, 'Error');

      });
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTime(expiresIn);
      this.authStatusListner.next(true);
    }
  }



  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.userName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    // this.toastr.success(`Logged Out Succesfull`, 'Logged Out');
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: any, expirationDate: Date, userId: string) {

    this.mainToken = token;
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('isLoggedIn');
  }
  private getAuthData() {
    const token: any = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
      // tslint:disable-next-line: align
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      userId: userId
    };
  }

  private setAuthTime(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
