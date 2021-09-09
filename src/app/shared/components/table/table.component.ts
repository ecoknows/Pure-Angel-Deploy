import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { data } from '../../routes/referrals/test-data';

export type IRows = {
  name: string;
  age: number;
  city: string;
  income: number;
}[];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  @Input('rows') rows: IRows = [];
  @Input('button-icon') button_icon: string = 'faUsers';
  @Input('button-title') button_title: string = 'Button';

  cache: IRows = [];

  constructor() {}

  ngOnInit(): void {
    this.cache = [...this.rows];
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.cache.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
  }
}
