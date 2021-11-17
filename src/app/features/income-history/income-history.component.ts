import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncomeHistoryState } from '@core/redux/income-history/income-history.reducer';
import { IncomeHistoryService } from '@core/services/income-history.service';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  middle: string;
  date: string;
  income: number;
}

@Component({
  selector: 'app-income-history',
  templateUrl: './income-history.component.html',
  styleUrls: ['./income-history.component.sass'],
})
export class IncomeHistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'income'];

  dataSource$: Observable<IncomeHistoryState[]>;
  ColumnMode = ColumnMode;

  title!: string | null;

  constructor(
    private route: ActivatedRoute,
    private incomeHistoryService: IncomeHistoryService,
    private store: Store<{ incomeHistoryReducer: IncomeHistoryState[] }>
  ) {
    this.title = this.route.snapshot.queryParamMap.get('income');
    this.dataSource$ = this.store.select('incomeHistoryReducer');
  }

  ngOnInit() {
    this.incomeHistoryService.resetIncomeHistory();
    switch (this.title) {
      case 'coffee-income':
        this.incomeHistoryService.fetchCoffeeIncome();
        break;
      case 'soap-income':
        this.incomeHistoryService.fetchSoapIncome();
        break;
      case 'new-member':
        this.incomeHistoryService.fetchNewMemberIncome();
        break;
    }
  }
}
