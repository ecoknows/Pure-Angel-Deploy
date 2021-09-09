import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IRows } from '@shared/components/table/table.component';
import { data } from './test-data';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ReferralsComponent implements OnInit {
  rows: IRows = data;
  temp: IRows = data;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
  }
}
