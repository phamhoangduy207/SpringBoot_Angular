import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  public credentials = { username: '', password: '' };
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  authenticationService(username, password) {
    //console.log('Staring authService');
    return this.http
      .get(`http://localhost:8080/auth/login`, {
        headers: {
          //basic token based on username and password, recieve a sessionid
          Authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          //console.log(this.cookieService.get('JSESSIONID'));
          this.credentials.username = username;
          this.registerSuccessfulLogin(this.credentials);
        })
      );
  }

  createBasicAuthToken(username, password) {
    //console.log('Creating token');
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(obj) {
    //console.log('Storing information');
    sessionStorage.setItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      JSON.stringify(Object.values(obj))
    );
  }

  logout() {
    console.log('logging out');
    sessionStorage.clear();
    this.cookieService.delete('JSESSIONID', '/', 'localhost');
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
    return usr[0];
  }

  getUserName() {
    return this.http.get('http://localhost:8080/api/greeting', {
      responseType: 'text',
    });
  }
}
