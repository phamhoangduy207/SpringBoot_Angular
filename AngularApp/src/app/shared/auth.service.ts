import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public credentials = { username: '', password: '' };
  public sessionid;
  constructor(private http: HttpClient) {}

  authenticationService(username, password) {
    console.log('Staring authService')
    return this.http
      .get(`http://localhost:8080/auth/login`, {
        headers: {
          //basic token based on username and password, recieve a sessionid
          Authorization: this.createBasicAuthToken(username, password),
        }, 
      })
      .pipe(
        map((res) => {
          this.sessionid = Object.values(res);
          console.log('Lấy ra coi chơi: ' + this.sessionid);
          this.credentials.username = username;
          this.credentials.password = window.btoa(username +":"+ password);
          this.registerSuccessfulLogin(this.credentials);
        })
      );
  }

  createBasicAuthToken(username, password) {
    console.log('Creating token');
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(obj) {
    console.log('Storing information')
    sessionStorage.setItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      JSON.stringify(Object.values(obj))
    );
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.credentials.username = null;
    this.credentials.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    let usr = JSON.parse(user);
    return usr;
  }
}
