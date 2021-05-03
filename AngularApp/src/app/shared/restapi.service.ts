import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { Book } from "./book.model";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {


  constructor(private http: HttpClient, private authService: AuthService) { }
  
  readonly baseURL = "http://localhost:8080/api";
  user: User = new User(); 
  getUsers(){
    return this.http.get<User>(this.baseURL + "/users");
  }
  
  book: Book = new Book();
  getBooks(){
    return this.http.get<Book>(this.baseURL + "/books");
  }

  createBooks(){
    return this.http.post(this.baseURL + "/books", this.book);
  }

  updateBooks(){
    return this.http.put(`${this.baseURL + "/books"}/${this.book.book_id}`, this.book);
  }

  deleteBooks(id:string) {
    return this.http.delete(`${this.baseURL + "/books"}/${id}`);
  }
}
   