import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-angular-file-uploader',
  templateUrl: './angular-file-uploader.component.html',
  styleUrls: ['./angular-file-uploader.component.scss'],
})
export class AngularFileUploaderComponent
  extends DefaultEditor
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}

  onUploadFinished(event) {
    console.log(event.target.files[0].name);
    this.cell.newValue = event.target.files[0].name;
  }

  onRemoved() {
    this.cell.newValue = null;
  }
}


//RenderComponent
@Component({
  template: `
    <div>
      <img
        [src]="domSrv.bypassSecurityTrustUrl('/assets/images/' + value)"
        class="rounded mb-3"
        width="100"
        height="100"
      />
    </div>
  `,
})
export class RenderComponent implements ViewCell {
  constructor(public domSrv: DomSanitizer){}
  @Input() value: string;
  @Input() rowData: any;
}
