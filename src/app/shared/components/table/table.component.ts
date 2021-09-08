import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  rows = [
    { name: 'A', age: 14, city: 'Manila', income: 1400 },
    { name: 'B', age: 14, city: 'Manila', income: 1400 },
    { name: 'C', age: 14, city: 'Manila', income: 1400 },
    { name: 'A', age: 14, city: 'Manila', income: 1400 },
    { name: 'B', age: 14, city: 'Manila', income: 1400 },
    { name: 'C', age: 14, city: 'Manila', income: 1400 },
    { name: 'D', age: 14, city: 'Manila', income: 1400 },
    { name: 'A', age: 14, city: 'Manila', income: 1400 },
    { name: 'B', age: 14, city: 'Manila', income: 1400 },
    { name: 'C', age: 14, city: 'Manila', income: 1400 },
    { name: 'D', age: 14, city: 'Manila', income: 1400 },
    { name: 'D', age: 14, city: 'Manila', income: 1400 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
