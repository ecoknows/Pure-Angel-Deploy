import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  date: string;
  income: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Jerico Villaraza', date: '6/15/15, 9:03 AM', income: 400 },
];

@Component({
  selector: 'app-income-history',
  templateUrl: './income-history.component.html',
  styleUrls: ['./income-history.component.sass'],
})
export class IncomeHistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'income'];
  dataSource = ELEMENT_DATA;

  title!: string | null;

  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.queryParamMap.get('income');
  }

  ngOnInit() {}
}
