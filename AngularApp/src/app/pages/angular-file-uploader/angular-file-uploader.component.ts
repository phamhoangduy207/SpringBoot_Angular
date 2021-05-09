import { Component, Input, OnInit,  } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-angular-file-uploader',
  templateUrl: './angular-file-uploader.component.html',
  styleUrls: ['./angular-file-uploader.component.scss'],
})
export class AngularFileUploaderComponent extends DefaultEditor implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onUploadFinished(event) {
    console.log(event.target.files[0].name);
   
    this.cell.newValue = event.target.files[0].name;
  }

  onRemoved() {
    this.cell.newValue = null;
  }
}

@Component({
  template: `
    <div>
      <img [src]="value" class="rounded mb-3" width="80" height="80" />
    </div>
  `,
})
export class RenderComponent implements ViewCell {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {}
}
