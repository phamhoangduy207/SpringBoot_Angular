import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { isNumeric } from 'rxjs/internal/util/isNumeric';
import { Category } from 'src/app/shared/models/category.model';
import { Book } from '../../shared/models/book.model';
import { RestApiService } from '../../shared/services/restapi.service';
import {
  AngularFileUploaderComponent,
  RenderComponent,
} from '../angular-file-uploader/angular-file-uploader.component';
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from '../smart-table-datepicker/smart-table-datepicker.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  src: LocalDataSource = new LocalDataSource();
  listBooks: Book[] = [];
  listCats: any[];
  counter: number = 0;

  loading = false;
  searchKey: string = '';

  constructor(
    private service: RestApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    this.getCategories();
    this.loading = true;
    setTimeout(() => (this.loading = false), 400);
  }

  ngOnInit(): void {}

  refreshList() {
    this.service.getBooks().subscribe({
      next: (data) => {
        this.listBooks = (data as unknown) as Book[];
        this.counter = this.listBooks.length;
        //console.log(this.counter)
        this.src.load(this.listBooks);
      },
      error: (err) => {
        console.error('There was an error', err);
      },
    });
    //console.log(this.src);
  }

  getCategories() {
    this.service.getCats().subscribe({
      next: (data) => {
        this.listCats = (data as unknown) as Category[];
        //console.log(this.listCats);
        for (const i of this.listCats) {
          this.settings.columns.category.editor.config.list.push({
            value: i.cat_id,
            title: i.description,
          });
          this.settings.columns.category.filter.config.list.push({
            value: i.description,
            title: i.description,
          });
          this.settings = Object.assign({}, this.settings);
        }
      },
    });
  }

  showAll() {
    this.src.reset();
  }

  settings = {
    pager: {
      display: true,
      perPage: 5,
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
      /* book_id: {
        title: 'Id',
        type: 'number',
        width: '5%',
        editable: false,
      }, */
      title: {
        title: 'Title',
        type: 'string',
        width: '23%',
      },
      category: {
        title: 'Category',
        type: 'string',
        width: '12%',
        editor: {
          type: 'list',
          config: {
            //selectText: 'Select one',
            list: [],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'All category',
            list: [],
          },
        },
        valuePrepareFunction: (cell?: {
          cat_id: number;
          description: string;
        }) => {
          return cell.description;
        },
        filterFunction: (cell?: any, search?: string) => {
          this.src.onChanged().subscribe((change) => {
            if (change.action === 'filter') {
              this.searchKey = change.filter.filters[0]['search'];
              //console.log(this.searchKey === cell.description);
              return cell.description === this.searchKey;
            }
          });
        },
      },
      published: {
        title: 'Published',
        type: 'custom',
        compareFunction: sortDate,
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '15%',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        },
      },
      authorName: {
        title: 'Author',
        type: 'string',
        width: '22%',
      },
      price: {
        title: 'Price',
        type: 'number',
        width: '13%',
      },
      imageURL: {
        title: 'Cover',
        width: '13%',
        filter: false,
        sort: false,
        /* type: 'html',
        valuePrepareFunction: (url: any) => {
          return `<img src ="${url}" width = "80px" height ="80px" />`;
        }, */
        type: 'custom',
        renderComponent: RenderComponent,
        editor: {
          type: 'custom',
          component: AngularFileUploaderComponent,
        },
      },
    },
  };
  onDeleteConfirm(event: any): void {
    //console.log(event.data.book_id);
    if (window.confirm('Are you sure you want to delete this?')) {
      this.service.deleteBooks(event.data.book_id).subscribe(
        (res) => {
          event.confirm.resolve(event.source.data);
          this.refreshList();
          this.toastr.success('Book deleted', 'Notification');
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
      category: {
        cat_id: event.newData.category,
      },
      authorName: event.newData.authorName,
      published: event.newData.published,
      price: event.newData.price,
      imageURL: event.newData.imageURL,
    };
    console.log(event.newData);
    if (data.title === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.category.cat_id === '') {
      this.toastr.warning('Please choose a category!', 'Warning');
    } else if (data.authorName === '') {
      this.toastr.warning('Please provide author name!', 'Warning');
    } else if (data.published === '') {
      this.toastr.warning('Please pick a published day!', 'Warning');
    } else if (data.price === '') {
      this.toastr.warning('Please fill in a price for the book!', 'Warning');
    } else if (!isNumeric(data.price)) {
      this.toastr.warning('Invalid price!', 'Warning');
    } else if (data.imageURL === '') {
      this.toastr.warning('Please pick a cover image!', 'Warning');
    } else {
      this.http.post(this.service.baseURL + '/books', data).subscribe(
        (res) => {
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('New book added!');
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
      title: event.newData.title,
      authorName: event.newData.authorName,
      published: event.newData.published,
      price: event.newData.price,
      imageURL: event.newData.imageURL,
      book_id: event.newData.book_id,
    };
    if (data.title === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.authorName === '') {
      this.toastr.warning('Please provide author name!', 'Warning');
    } else if (data.published === '') {
      this.toastr.warning('Please pick a published day!', 'Warning');
    } else if (data.price === '') {
      this.toastr.warning('Please fill in a price for the book!', 'Warning');
    } else if (!isNumeric(data.price)) {
      this.toastr.warning('Invalid price!', 'Warning');
    } else if (data.imageURL === '') {
      this.toastr.warning('Please pick a cover image!', 'Warning');
    } else {
      this.http
        .put(
          `${this.service.baseURL + '/books'}/${event.newData.book_id}`,
          data
        )
        .subscribe(
          (res) => {
            //console.log(res);
            event.confirm.resolve(event.newData);
            this.refreshList();
            this.toastr.success('Book details Edited');
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
}

//date sorting
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
};
