import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from "@nebular/theme";
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LayoutService } from "../../shared/layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  constructor(
    private themeService: NbThemeService,
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService
  ) { 
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean{
    this.sidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome(){
    this.menuService.navigateHome();
    return false;
  }
}

