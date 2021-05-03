import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService){
  }

  ngOnInit(): void {
  }


  toggle(){
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
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
    {
      title: 'Manage',
      icon: 'clipboard-outline',
      children: [
        {
          title: 'Users',
          link: 'users',
          icon: 'person-outline',
        },
        {
          title: 'Books',
          link: 'books',
          icon: 'cube-outline',
        },
      ], 
    },
    {
      title: 'Log out',
      link: 'logout',
      icon: 'log-out-outline'
    }
  ];
}
