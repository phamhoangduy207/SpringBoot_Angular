import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private http: HttpClient, public authService: AuthService) { 
  }

  name: any;

  ngOnInit(): void {
    this.authService.getUserName().subscribe({
      next: (res: string) => {
        this.name = res;
      }
    })
  }

}
