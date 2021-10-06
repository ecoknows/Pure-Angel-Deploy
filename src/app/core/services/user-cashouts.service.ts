import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setUserCashoutsTable } from '@core/redux/cashouts/user-cashouts.actions';
import { UserCashoutsState } from '@core/redux/cashouts/user-cashouts.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserCashoutsService {
  cache!: UserCashoutsState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchUserCashouts() {
    this.http
      .get<{ message: string; data: UserCashoutsState[] }>(
        environment.api + 'api/user-cashouts/',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.store.dispatch(setUserCashoutsTable({ list: data }));
        }
      });
  }

  cashout(amount: number) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/user-cashouts/cashout',
        {
          cashout: amount,
        },
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        this.authService.fetchIncome();
      });
  }
}
