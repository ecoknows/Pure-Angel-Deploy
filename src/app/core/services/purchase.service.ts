import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setUserPurchaseItem } from '@core/redux/purchase/user-purchase.actions';
import { UserPurchaseState } from '@core/redux/purchase/user-purchase.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  cache!: UserPurchaseState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchPurchase() {
    this.http
      .get<{ message: string; data: UserPurchaseState[] }>(
        environment.api + 'api/purchase/',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;
          if (data) {
            this.store.dispatch(setUserPurchaseItem({ list: data }));
          }
        },
        (error) => {}
      );
  }

  purchase(quantity: number) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/purchase/add',
        {
          quantity,
        },
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          this.fetchPurchase();
        },
        (error) => {}
      );
  }
}
