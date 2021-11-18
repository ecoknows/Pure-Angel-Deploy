import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  resetListPinHistory,
  setListPinHistory,
} from '@core/redux/pin-history/pin-history.actions';
import { PinHistoryState } from '@core/redux/pin-history/pin-history.reducer';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PinHistoryService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  resetPinHistory() {
    this.store.dispatch(resetListPinHistory());
  }

  fetchPinHistory() {
    this.http
      .get<{ message: string; data: PinHistoryState[] }>(
        environment.api + 'api/pin-history',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;

          if (data) {
            this.store.dispatch(setListPinHistory({ list: data }));
          }
        },
        (error) => {}
      );
  }
}
