import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { Author } from 'src/app/shared/models/author';
import { RestApiService } from 'src/app/shared/services/restapi.service';

@Component({
  selector: 'app-author-multiple-select',
  templateUrl: './author-multiple-select.component.html',
  styleUrls: ['./author-multiple-select.component.scss']
})
export class AuthorMultipleSelectComponent extends DefaultEditor implements OnInit {

  @Input() value; // data from table
  @Input() rowData;

  authorsList: Author[] = [];
  displayedModel: any;

  constructor(private service: RestApiService) { 
    super();
  }

  getAuthors(){
    return this.service.getAuthors().subscribe({
      next: (data) => {
        this.authorsList = data as unknown as Author[];
      }
    })
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  showData(){
    this.cell.newValue = this.displayedModel;
  }

}
