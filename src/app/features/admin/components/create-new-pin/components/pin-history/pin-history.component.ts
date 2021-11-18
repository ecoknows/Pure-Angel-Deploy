import { Component, OnInit } from '@angular/core';
import { IncomeHistoryState } from '@core/redux/income-history/income-history.reducer';
import { PinHistoryState } from '@core/redux/pin-history/pin-history.reducer';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { IncomeHistoryService } from '@core/services/income-history.service';
import { PinHistoryService } from '@core/services/pin-history.service';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pin-history',
  templateUrl: './pin-history.component.html',
  styleUrls: ['./pin-history.component.sass'],
})
export class PinHistoryComponent implements OnInit {
  dataSource$: Observable<PinHistoryState[]>;
  user$: Observable<UserState>;
  ColumnMode = ColumnMode;

  constructor(
    private pinHistoryService: PinHistoryService,
    private store: Store<{
      pinHistoryReducer: PinHistoryState[];
      userReducer: UserState;
    }>
  ) {
    this.dataSource$ = this.store.select('pinHistoryReducer');
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit() {
    this.pinHistoryService.fetchPinHistory();
  }
}
