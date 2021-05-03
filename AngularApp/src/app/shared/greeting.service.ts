import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from "./message";
@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor(private http:HttpClient) { }

  greeting(){
    return this.http.get<Message>('http://localhost:8080/api/greeting');
  }
}
