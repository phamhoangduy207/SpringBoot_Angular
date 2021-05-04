import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Book } from "../models/book.model";
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {


  constructor(private http: HttpClient, private authService: AuthService) { }
  
  readonly baseURL = "http://localhost:8080/api";

  //user
  user: User = new User(); 

  getUsers(){
    return this.http.get<User>(this.baseURL + "/users");
  }
  

  //book
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


  //category
  cat: Category = new Category();

  getCats(){
    return this.http.get<Category>(this.baseURL + "/categories");
  }

  createCats(){
    return this.http.post(this.baseURL + "/categories", this.cat);
  }

  updateCats(){
    return this.http.put(`${this.baseURL + "/categories"}/${this.cat.cat_id}`, this.cat);
  }

  deleteCats(id:string){
    return this.http.delete(`${this.baseURL + "/categories"}/${id}`);
  }
}
   