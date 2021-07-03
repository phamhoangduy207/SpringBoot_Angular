import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/author';
import { Category } from 'src/app/shared/models/category.model';
import { RestApiService } from 'src/app/shared/services/restapi.service';

@Component({
  selector: 'app-author-multiple-select',
  templateUrl: './author-multiple-select.component.html',
  styleUrls: ['./author-multiple-select.component.scss'],
})
export class AuthorMultipleSelectComponent
  extends DefaultEditor
  implements OnInit
{
  @Input() value; // data from table
  @Input() rowData;

  listItems: Author[] = [];
  selectedItems: Author[] = [];

  constructor(private service: RestApiService) {
    super();
  }

  getAuthors() {
    return this.service.getAuthors().subscribe({
      next: (data) => {
        this.listItems = data as unknown as Author[];
      },
    });
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  showOptions() {
    //console.log(this.selectedItems);
    this.cell.newValue = this.selectedItems;
  }
}

//Category Editor (dropdown)
@Component({
  selector: 'selector-name',
  template: `<nb-select
    name="selectedItem"
    [(ngModel)]="selectedItem"
    placeholder="Select category"
  >
    <nb-option
      *ngFor="let item of listItems"
      [value]="item"
      (click)="showData()"
    >
      {{ item.description }}
    </nb-option>
  </nb-select>`,
})
export class CategoryCustomEditorComponent
  extends DefaultEditor
  implements OnInit
{
  constructor(private service: RestApiService) {
    super();
  }
  listItems: Category[] = [];
  selectedItem: Category;
  showData() {
    console.log(this.selectedItem.description);
    this.cell.newValue = this.selectedItem.cat_id;
  }

  ngOnInit() {
    this.getCategories();
    this.showData();
  }

  getCategories() {
    return this.service.getCats().subscribe({
      next: (data) => {
        this.listItems = data as unknown as Category[];
      },
    });
  }
}

//Title Editor
@Component({
  selector: 'selector-name',
  template: `<input
    nbInput
    placeholder="Title"
    [(ngModel)]="inputModel"
    (keyup)="showData($event)"
  />`,
})
export class TitleCustomEditorComponent
  extends DefaultEditor
  implements OnInit
{
  constructor() {
    super();
  }

  inputModel: string;

  ngOnInit() {
    if (this.cell.newValue) {
      //console.log(this.cell.newValue);
      this.inputModel = this.cell.newValue;
      this.cell.newValue = this.inputModel;
    }
  }

  showData(event: any) {
    console.log(event.target.value);
    this.cell.newValue = event.target.value;
  }
}

//Price Editor
@Component({
  selector: 'selector-name',
  template: `<input
    nbInput
    placeholder="Price"
    [(ngModel)]="inputModel"
    (keyup)="showData($event)"
  />`,
})
export class PriceCustomEditorComponent
  extends DefaultEditor
  implements OnInit
{
  constructor() {
    super();
  }
  inputModel: string;
  ngOnInit() {
    if (this.cell.newValue) {
      this.inputModel = this.cell.newValue;
      this.cell.newValue = this.inputModel;
    }
  }
  showData(event: any) {
    //console.log(event.target.value);
    this.cell.newValue = event.target.value;
  }
}
