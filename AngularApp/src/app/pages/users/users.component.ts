import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { User } from "../../shared/models/user.model";
import { RestApiService } from '../../shared/services/restapi.service';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../smart-table-datepicker/smart-table-datepicker.component'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  src: LocalDataSource = new LocalDataSource();
  listUsers: User[] = [];
  counter: number=0;
  
  loading = false;

  constructor(
    private service: RestApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    this.counter = this.src.count();

    this.loading = true;
    setTimeout(() => this.loading = false, 400);
   }

   showAll() {
    this.src.reset();
  }

   refreshList(){
    this.service.getUsers().subscribe({
      next: data => {
        this.listUsers = data as unknown as User[];
        this.counter = this.listUsers.length;
        this.src.load(this.listUsers);
      },
      error: err => {
        console.error("There was an error", err);
      }
    });
    //console.log(this.src);
  }

   settings = {
    pager:{
      display: true,
      perPage: 6
    },
    actions: false,
    add: {
      addButtonContent: '<i class="bi bi-plus"></i>',
      createButtonContent: '<i class="bi bi-check-square"></i>',
      cancelButtonContent: '<i class="bi bi-arrow-counterclockwise"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="bi bi-pencil-square"></i>',
      saveButtonContent: '<i class="bi bi-check-square"></i>',
      cancelButtonContent: '<i class="bi bi-arrow-counterclockwise"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="bi bi-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      user_id: {
        title: 'Id',
        type: 'number',
        sortDirection: 'asc',
        width: '5%',
        class: 'custom',
        editable: false
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        width: '14%'
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        width: '20%'
      },
      birthday: {
        title: 'Birthday',
        type: 'custom',
        compareFunction: sortDate,
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '28%',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      username: {
        title: 'Email',
        type: 'string',
        width: '28%'
      },
      imageURL: {
        title: 'Image',
        type: 'html',
        filter: false,
        sort: false,
        valuePrepareFunction: (url: any) => {
          return `<img src ="${url}" width="100px" height="100px"/>`;
        }
      }
    },
  };
  
}
export const sortDate = (direction: any, a: string, b: string): number => {
  let first = Number(new DatePipe('en-US').transform(a, 'yyyyMMdd'));
  let second = Number(new DatePipe('en-US').transform(b, 'yyyyMMdd'));

  if (first < second) {
      return -1 * direction;
  }
  if (first > second) {
      return direction;
  }
  return 0;
}