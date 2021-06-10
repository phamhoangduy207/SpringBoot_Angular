import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,
  NbSidebarModule,
  NbIconModule,
  NbSelectModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarService,
  NbActionsModule,
  NbUserModule,
  NbSearchModule,
  NbContextMenuModule,
  NbSpinnerModule,
  NbButtonModule,
  NbTooltipModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS,
} from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from './smart-table-datepicker/smart-table-datepicker.component';
import { LayoutService } from '../shared/services/layout.service';
import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { CategoriesComponent } from './categories/categories.component';
import {
  AngularFileUploaderComponent,
  RenderComponent,
} from './angular-file-uploader/angular-file-uploader.component';
import { AuthorComponent } from './author/author.component';
import { AuthorMultipleSelectComponent } from './author-multiple-select/author-multiple-select.component';

export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'MMM DD YYYY',
  datePickerInput: 'MMM DD YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    
    NbLayoutModule,
    NbCardModule,
    NbSidebarModule,
    NbSelectModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbUserModule,
    NbSearchModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbButtonModule,
    NbTooltipModule,
    NbSelectModule,

    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  declarations: [
    UsersComponent,
    BooksComponent,
    DashboardComponent,
    PagesComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
    HeaderComponent,
    LogoutComponent,
    CategoriesComponent,
    AngularFileUploaderComponent,
    RenderComponent,
    AuthorComponent,
    AuthorMultipleSelectComponent,
  ],
  entryComponents: [
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
    AuthorMultipleSelectComponent
  ],
  providers: [
    LayoutService,
    NbSidebarService,
    BooksComponent,
    CategoriesComponent,
    UsersComponent,
    AuthorComponent,
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_MOMENT_FORMATS,
    },
  ],
})
export class PagesModule {}
