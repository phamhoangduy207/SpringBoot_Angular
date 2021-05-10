import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category.model';
import { RestApiService } from 'src/app/shared/services/restapi.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  src: LocalDataSource = new LocalDataSource();
  listCats: Category[] = [];
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
    this.service.getCats().subscribe({
      next: (data) => {
        this.listCats = (data as unknown) as Category[];
        this.counter = this.listCats.length;
        this.src.load(this.listCats);
      },
      error: (err) => {
        console.error('There was an error', err);
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
      description: {
        title: 'Description',
        type: 'string',
        width: '95%'
      },
    },
  };
  onDeleteConfirm(event: any): void {
    //console.log(event.data.cat_id);
    if (window.confirm('Are you sure you want to delete this?')) {
      this.service.deleteCats(event.data.cat_id).subscribe(
        (res) => {
          event.confirm.resolve(event.source.data);
          this.refreshList();
          this.toastr.success('Category deleted', 'Notification');
        },
        (err) => {
          if(err.status === 500)
          this.toastr.error('Can not delete this category because it is currently in used', 'Task failed');
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event: any): void {
    var data = {
      description: event.newData.description,
    };
    //console.log(event.newData);
    if(data.description === ''){
      this.toastr.warning('Please provide a description!', 'Warning');
    } else {
      this.http.post(this.service.baseURL + '/categories', data).subscribe(
        (res) => {
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('New category added!');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        }
      );
    }
  }

  onSaveConfirm(event: any): void {
    var data = {
      description: event.newData.description,
      cat_id: event.newData.cat_id,
    };
    if(data.description === ''){
      this.toastr.warning('Please provide a description', 'Warning');
    }
    this.http
      .put(`${this.service.baseURL + '/categories'}/${event.newData.cat_id}`, data)
      .subscribe(
        (res) => {
          //console.log(res);
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('Category Edited');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        }
      );
  }

}
