import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../shared/book.model';
import { RestApiService } from '../../shared/restapi.service';
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from '../smart-table-datepicker/smart-table-datepicker.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  src: LocalDataSource = new LocalDataSource();
  listBooks: any[];

  refreshList() {
    this.service.getBooks().subscribe({
      next: (data) => {
        this.listBooks = (data as unknown) as Book[];
        console.log(this.listBooks);
        this.src.load(this.listBooks);
      },
      error: (err) => {
        console.error('There was an error', err);
      },
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
      book_id: {
        title: 'Id',
        type: 'number',
        width: '5%',
        class: 'custom',
        editable: false,
      },
      title: {
        title: 'Title',
        type: 'string',
        width: '14%',
      },
      category: {
        title: 'Category',
        type: 'string',
        width: '20%',
      },
      published: {
        title: 'Published',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '28%',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        },
      },
      authorName: {
        title: 'Author',
        type: 'string',
        width: '28%',
      },
      price: {
        title: 'Price',
        type: 'number',
        width: '10%',
      },
    },
  };
  onDeleteConfirm(event: any): void {
    console.log(event.data.book_id);
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteBooks(event.data.id).subscribe(
        (res) => {
          event.confirm.resolve(event.source.data);
          this.refreshList();
          this.toastr.info('Book deleted', 'Notification');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event: any): void {
    var data = {
      title: event.newData.title,
      category: event.newData.category,
      authorName: event.newData.authorName,
      published: event.newData.published,
      price: event.newData.price,
    };
    console.log(event.newData);
    this.http.post(this.service.baseURL + '/books', data).subscribe(
      (res) => {
        event.confirm.resolve(event.newData);
        this.refreshList();
        this.toastr.success('New book added!', 'Success');
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

  onSaveConfirm(event: any): void {
    var data = {
      title: event.newData.title,
      category: event.newData.category,
      authorName: event.newData.authorName,
      published: event.newData.published,
      price: event.newData.price,
      book_id: event.newData.book_id,
    };
    this.http
      .put(`${this.service.baseURL + '/books'}/${event.newData.book_id}`, data)
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.info('Book details Edited', 'Success');
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