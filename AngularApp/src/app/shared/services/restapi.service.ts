import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Book } from "../models/book.model";
import { Category } from '../models/category.model';
import { Author } from '../models/author';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  //HttpClientModule is used here
  constructor(private http: HttpClient) { }
  
  readonly baseURL = "http://localhost:8080/api"; //backend environment

  //user
  user: User = new User(); 

  getUsers(){
    return this.http.get<User>("http://localhost:8080/auth/users"); //UserController enpoint
  }
  

  //book
  book: Book = new Book();
  getBooks(){
    return this.http.get<Book>(this.baseURL + "/books"); //BookController enpoints
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
    return this.http.get<Category>(this.baseURL + "/categories") 
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

  //author
  author: Author = new Author();
  getAuthors(){
    return this.http.get<Author>(this.baseURL + "/authors") 
  }

  createAuthors(){
    return this.http.post(this.baseURL + "/authors", this.author);
  }

  updateAuthors(){
    return this.http.put(`${this.baseURL + "/authors"}/${this.author.author_id}`, this.author);
  }

  deleteAuthors(id:string){
    return this.http.delete(`${this.baseURL + "/authors"}/${id}`);
  }
  
}
   