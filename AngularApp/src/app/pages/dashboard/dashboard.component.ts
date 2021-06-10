import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AuthorComponent } from '../author/author.component';

import { BooksComponent } from '../books/books.component';
import { CategoriesComponent } from '../categories/categories.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterContentChecked {
  user: UserDetails;

  nauthor: number;
  nbook: number;
  ncat: number;
  nuser: number;

  loading = false;

  constructor(
    private author: AuthorComponent,
    private book: BooksComponent,
    private cat: CategoriesComponent,
    private usr: UsersComponent,
    public authService: AuthService
  ) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 400);
  }

  ngAfterContentChecked(){
    this.nauthor = this.author.counter;
    this.nbook = this.book.counter;
    this.ncat = this.cat.counter;
    this.nuser = this.usr.counter;
  }

}
export interface UserDetails {
  fullName: '';
  imageURL: '';
}
