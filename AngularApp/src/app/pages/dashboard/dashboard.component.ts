import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, public authService: AuthService) {}

  user: UserDetails;

  abc = "Duy";

  ngOnInit(): void {
    this.authService.getUserName().subscribe({
      next: (res) => {
        this.user = (JSON.parse(res) as unknown) as UserDetails;
        console.log(this.user);
      },
    });
  }
}
export interface UserDetails {
  fullName: '';
  imageURL: '';
}
