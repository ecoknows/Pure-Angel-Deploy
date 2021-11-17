import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  setListIncomeHistory,
  resetListIncomeHistory,
} from '@core/redux/income-history/income-history.actions';
import { IncomeHistoryState } from '@core/redux/income-history/income-history.reducer';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { SnackbarComponent } from '@shared/components';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeHistoryService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private store: Store<{}>
  ) {}

  resetIncomeHistory() {
    this.store.dispatch(resetListIncomeHistory());
  }

  fetchCoffeeIncome() {
    this.http
      .get<{ message: string; data: IncomeHistoryState[] }>(
        environment.api + 'api/income-history/coffee-income',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;

          if (data) {
            this.store.dispatch(setListIncomeHistory({ list: data }));
          }
        },
        (error) => {}
      );
  }

  fetchSoapIncome() {
    this.http
      .get<{ message: string; data: IncomeHistoryState[] }>(
        environment.api + 'api/income-history/soap-income',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;

          if (data) {
            this.store.dispatch(setListIncomeHistory({ list: data }));
          }
        },
        (error) => {}
      );
  }

  fetchNewMemberIncome() {
    this.http
      .get<{ message: string; data: IncomeHistoryState[] }>(
        environment.api + 'api/income-history/new-member-income',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;
          if (data) {
            this.store.dispatch(setListIncomeHistory({ list: data }));
          }
        },
        (error) => {}
      );
  }
}
