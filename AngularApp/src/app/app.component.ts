import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularApp'
  ngOnInit() {}
}
