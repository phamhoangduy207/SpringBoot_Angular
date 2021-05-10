import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

import { BooksComponent } from '../books/books.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: UserDetails;
  nbook: number;
  ncat: number;
  nuser: number;


  loading = false;

  constructor(
    private http: HttpClient,
    private book: BooksComponent,
    private cat: CategoriesComponent,
    private usr: UsersComponent,
    public authService: AuthService
  ) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 400);

    this.nbook = this.book.counter;
    this.ncat = this.cat.counter;
    this.nuser = this.usr.counter;

  }

  ngOnInit(): void {
    /* this.authService.getUserName().subscribe({
      next: (res) => {
        this.user = (JSON.parse(res) as unknown) as UserDetails;
        //console.log(this.user);
      },
    }); */

  }
}
export interface UserDetails {
  fullName: '';
  imageURL: '';
}
