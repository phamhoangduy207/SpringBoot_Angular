import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-smart-table-datepicker',
  templateUrl: './smart-table-datepicker.component.html',
  styleUrls: ['./smart-table-datepicker.component.scss'],
})

export class SmartTableDatepickerComponent extends DefaultEditor implements OnInit {
  @Input() min: Date;

  @Input() max: Date;

  stringValue;
  inputModel: Date;

  constructor(private dateTimeAdapter: DateTimeAdapter<any>) {
    super();
    dateTimeAdapter.setLocale('en');
  }

  ngOnInit() {
    //setting time range from the last 100 years to today
    if (!this.max) {
      this.max = new Date();
      //this.max.setMinutes(Math.floor(this.max.getMinutes() / 15) * 15);
    }
    if (!this.min) {
      this.min = new Date(this.max);
      this.min.setFullYear(this.max.getFullYear() - 100);
    }

    if (this.cell.newValue) {
      console.log(this.cell.newValue);
      let cellValue = new Date(this.cell.newValue);
      if (
        cellValue.getTime() >= this.min.getTime() &&
        cellValue.getTime() <= this.max.getTime()
      ) {
        this.inputModel = cellValue;
        this.cell.newValue = this.inputModel.toDateString();
      }
    }

    //default cell value is today
    if (!this.inputModel) {
      this.inputModel = this.max;
      this.cell.newValue = this.inputModel.toDateString();
    }
  }

  onChange() {
    if (this.inputModel) {
      this.cell.newValue = this.inputModel.toDateString();
    }
  }
}

@Component({
  template: ` {{ value | date }} `,
})
export class SmartTableDatepickerRenderComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {}

  ngOnInit() {}
}
