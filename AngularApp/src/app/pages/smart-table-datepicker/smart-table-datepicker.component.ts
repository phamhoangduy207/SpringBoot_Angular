import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-smart-table-datepicker',
  templateUrl: './smart-table-datepicker.component.html',
  styleUrls: ['./smart-table-datepicker.component.scss'],
})
export class SmartTableDatepickerComponent
  extends DefaultEditor
  implements OnInit {
  @Input() min: Date; // Defaults to now(rounded down to the nearest 15 minute mark)

  @Input() max: Date; // Defaults to 1 month after the min

  stringValue;
  inputModel: Date;

  constructor(private dateTimeAdapter: DateTimeAdapter<any>) {
    super();
   // dateTimeAdapter.setLocale('vi-VN');
  }

  ngOnInit() {
    if (!this.max) {
      this.max = new Date();
      //this.max.setMinutes(Math.floor(this.max.getMinutes() / 15) * 15);
    }

    if (!this.min) {
      this.min = new Date(this.max);
      this.min.setFullYear(this.max.getFullYear() - 100);
    }

    if (this.cell.newValue) {
      let cellValue = new Date(this.cell.newValue);
      if (
        cellValue.getTime() >= this.min.getTime() &&
        cellValue.getTime() <= this.max.getTime()
      ) {
        this.inputModel = cellValue;
        this.cell.newValue = this.inputModel.toLocaleDateString();
      }
    }

    if (!this.inputModel) {
      this.inputModel = this.max;
      this.cell.newValue = this.inputModel.toLocaleDateString();
    }
  }

  onChange() {
    if (this.inputModel) {
      this.cell.newValue = this.inputModel.toLocaleDateString();
    }
  }
}

@Component({
  template: ` {{ value | date: 'medium' }} `,
})
export class SmartTableDatepickerRenderComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {}

  ngOnInit() {}
}
