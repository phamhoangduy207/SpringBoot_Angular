import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { isNumeric } from 'rxjs/internal/util/isNumeric';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category.model';
import { Book } from '../../shared/models/book.model';
import { RestApiService } from '../../shared/services/restapi.service';
import {
  AngularFileUploaderComponent,
  RenderComponent,
} from '../angular-file-uploader/angular-file-uploader.component';
import { AuthorMultipleSelectComponent, CategoryCustomEditorComponent, PriceCustomEditorComponent, TitleCustomEditorComponent } from '../author-multiple-select/author-multiple-select.component';
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
  listCats: Category[] = [];
  listAuthors: Author[] = [];
  categoriesListForEditor = [];
  authorsListForEditor = [];
  categoriesListForFilter = [];
  authorsListForFilter = [];
  counter: number = 0;

  loading = false;

  constructor(
    private service: RestApiService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    this.getCategories();
    this.getAuthors();
    this.loading = true;
    setTimeout(() => (this.loading = false), 400);
  }

  ngOnInit(): void {}

  showAll() {
    this.src.reset();
  }

  refreshList() {
    this.service.getBooks().subscribe({
      next: (data) => {
        this.listBooks = data as unknown as Book[];
        this.src.load(this.listBooks);
        this.counter = this.listBooks.length;
      },
      error: (err) => {
        console.error('There was an error', err.message);
      },
    });
    //console.log(this.src);
  }

  getCategories() {
    this.service.getCats().subscribe({
      next: (data) => {
        this.listCats = data as unknown as Category[];
        //console.log(this.listCats);
        for (const i of this.listCats) {
          this.categoriesListForFilter.push({
            value: i.description,
            title: i.description,
          });
          this.categoriesListForEditor.push({
            value: i.cat_id,
            title: i.description,
          });
          this.settings = Object.assign({}, this.settings);
        }
      },
    });
  }

  getAuthors() {
    this.service.getAuthors().subscribe({
      next: (data) => {
        this.listAuthors = data as unknown as Author[];
        //console.log(this.listCats);
        for (const i of this.listAuthors) {
          this.authorsListForFilter.push({
            value: i.authorName,
            title: i.authorName,
          });
          this.authorsListForEditor.push({
            value: i.author_id,
            title: i.authorName,
          });
          this.settings = Object.assign({}, this.settings);
        }
      },
    });
  }

  settings = {
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
        editor: {
          type: 'custom',
          component: TitleCustomEditorComponent,
        },
       /*  filter: {
          type: 'custom',
          component: TitleCustomEditorComponent
        } */
      },
      authors: {
        title: 'Author',
        sort: false,
        valuePrepareFunction: (cell?: Author[]) => {
          var value = '';
          for (var i = 0; i < cell.length; i++) {
            value += cell[i].authorName + ' | ';
          }
          return value.slice(0, -2);
        },
        width: '15%',
        /* type: 'custom',
        renderComponent: AuthorMultipleSelectRenderComponent, */
        /* editor: {
          type: 'list',
          config: {
            list: this.authorsListForEditor
          },
        }, */
        editor: {
          type: 'custom',
          component: AuthorMultipleSelectComponent,
        },
        filter: {
          type: 'list',
          config: {
            selectText: '--Select one--',
            list: this.authorsListForFilter,
          },
        },
        filterFunction: (cell?: any, search?: string) => {
          for (var i = 0; i < cell.length; i++) {
            if (cell[i].authorName == search) {
              return cell[i].authorName == search;
            }
          }
        },
      },
      category: {
        title: 'Category',
        //editable: false,
        sort: false,
        valuePrepareFunction: (cell?: Category) => {
          return cell.description;
        },
        filterFunction: (cell?: any, search?: string) => {
          return cell.description == search;
        },
        width: '15%',
        editor: {
          /* type: 'list',
          config: {
            list: this.categoriesListForEditor,
          }, */
          type: 'custom',
          component: CategoryCustomEditorComponent
        },
        filter: {
          type: 'list',
          config: {
            selectText: '--Select one--',
            list: this.categoriesListForFilter,
          },
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
      price: {
        title: 'Price',
        type: 'number',
        width: '10%',
        valuePrepareFunction: (value) => {
          return value === 'Total'
            ? value
            : Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value);
        },
        editor:{
          type: 'custom',
          component: PriceCustomEditorComponent
        }
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
    var autor = [];
    for (var i = 0; i < event.newData.authors.length; i++) {
      autor.push({
        author_id: event.newData.authors[i],
      });
    }
    console.log(autor)
    var data = {
      title: event.newData.title,
      category: {
        cat_id: event.newData.category,
      },
      authors: autor,
      published: event.newData.published,
      price: event.newData.price,
      imageURL: event.newData.imageURL,
    };
    console.log(event.newData);
    if (data.title === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.category.cat_id === '') {
      this.toastr.warning('Please choose a category!', 'Warning');
    } else if (data.authors === null) {
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
            console.log('Client-side error occurred.');
          } else {
            console.log('Server-side error occurred. ' + err.message);
          }
        }
      );
    }
  }

  onSaveConfirm(event: any): void {
    var autor = [];
    for (var i = 0; i < event.newData.authors.length; i++) {
      autor.push({
        author_id: event.newData.authors[i]
      });
    }
    var data = {
      title: event.newData.title,
      category: {
        cat_id: event.newData.category,
      },
      authors: autor,
      published: event.newData.published,
      price: event.newData.price,
      imageURL: event.newData.imageURL,
      book_id: event.newData.book_id,
    };
    console.log(event.newData);
    if (data.title === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.authors === null) {
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
              console.log('Server-side error occured. ' + err.message);
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
