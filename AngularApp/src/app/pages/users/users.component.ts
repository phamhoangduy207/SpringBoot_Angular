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
  listUsers: any[];

  refreshList(){
    this.service.getUsers().subscribe({
      next: data => {
        this.listUsers = data as unknown as User[];
        console.log(this.listUsers);
        this.src.load(this.listUsers);
      },
      error: err => {
        console.error("There was an error", err);
      }
    });
    console.log(this.src);
  }

  constructor(
    private service: RestApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
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
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '28%',
        sortDirection: 'desc',
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
        type: 'string',
      }
    },
    
  };
  
}
