import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
