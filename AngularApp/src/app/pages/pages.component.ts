import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  title = 'AngularApp';

  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: 'dashboard',
      icon: 'tv-outline',
    },
    {
      title: 'Books',
      link: 'books',
      icon: 'book-outline',
    },
    {
      title: 'Categories',
      link: 'categories',
      icon: 'book-open-outline',
    },
    {
      title: 'Authors',
      link: 'authors',
      icon: 'edit-2-outline',
    },
    {
      title: 'Users',
      link: 'users',
      icon: 'person-outline',
    },
  ];
}
