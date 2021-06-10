import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/shared/models/author';
import { RestApiService } from 'src/app/shared/services/restapi.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {

  src: LocalDataSource = new LocalDataSource();
  listAuthors: Author[] = [];
  counter: number=0;

  loading = false;

  constructor(
    private service: RestApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    //spinner
    this.loading = true;
    setTimeout(() => this.loading = false, 400);
  }
  refreshList() {
    this.service.getAuthors().subscribe({
      next: (data) => {
        this.listAuthors = (data as unknown) as Author[];
        this.counter = this.listAuthors.length;
        this.src.load(this.listAuthors);
      },
      error: (err) => {
        console.error('There was an error', err.message);
      },
    });
    //console.log(this.src);
  }

  settings = {
    pager: {
      display: true,
      perPage: 6,
    },
    actions: {
      position: 'right',
      width: '5%',
    },
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
      /* cat_id: {
        title: 'Id',
        type: 'number',
        editable: false
      }, */
      authorName: {
        title: 'Name',
        type: 'string',
        width: '95%'
      },
    },
  };
  onDeleteConfirm(event: any): void {
    //console.log(event.data.cat_id);
    if (window.confirm('Are you sure you want to delete this?')) {
      this.service.deleteAuthors(event.data.author_id).subscribe(
        (res) => {
          event.confirm.resolve(event.source.data);
          this.refreshList();
          this.toastr.success('Author deleted', 'Notification');
        },
        (err) => {
          if(err.status === 500)
          this.toastr.error('Can not delete this record because it is currently in used', 'Task failed');
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event: any): void {
    var data = {
      authorName: event.newData.authorName,
    };
    //console.log(event.newData);
    if(data.authorName === ''){
      this.toastr.warning('Please provide a name!', 'Warning');
    } else {
      this.http.post(this.service.baseURL + '/authors', data).subscribe(
        (res) => {
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('New record added!');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occurred.');
          } else {
            console.log('Server-side error occurred. ' + err.message);
          }
        }
      );
    }
  }

  onSaveConfirm(event: any): void {
    var data = {
      authorName: event.newData.description,
      author_id: event.newData.cat_id,
    };
    if(data.authorName === ''){
      this.toastr.warning('Please provide a description', 'Warning');
    }
    this.http
      .put(`${this.service.baseURL + '/authors'}/${event.newData.author_id}`, data)
      .subscribe(
        (res) => {
          //console.log(res);
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('Record edited');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occurred.');
          } else {
            console.log('Server-side error occurred.');
          }
        }
      );
  }


}
