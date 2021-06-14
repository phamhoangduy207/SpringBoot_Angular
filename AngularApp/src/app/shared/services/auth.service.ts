import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  authenticationService(username, password) {
    //This is where the backend called
    return this.http
      .get(`http://localhost:8080/api/greeting`, {
        headers: {
          //Passing Authorization header with value is a basic token (window.btoa())
          Authorization: this.createBasicAuthToken(username, password),
        },
      });
  }

  createBasicAuthToken(username, password) {
    //console.log('Creating token');
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  logout() {
    //console.log('logging out');
    this.cookieService.delete('JSESSIONID', '/', 'localhost');
  }

  isUserLoggedIn() {
    let user = this.cookieService.get('JSESSIONID');
    if (user == '') return false;
    return true;
  }

  getUserName() {
    return this.http.get('http://localhost:8080/api/greeting', {
      responseType: 'text',
    });
  }
}
