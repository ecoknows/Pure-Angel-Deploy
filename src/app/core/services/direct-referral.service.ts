import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@core/api';
import { fetchDirectReferral } from '@core/redux/direct-referral/direct-referral.actions';
import { DirectReferral } from '@core/redux/direct-referral/direct-referral.model';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DirectReferralService {
  public rows$: Observable<DirectReferralState>;

  cache!: DirectReferral[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ directReferralReducer: DirectReferralState }>
  ) {
    this.rows$ = this.store.select('directReferralReducer');
  }

  fetchDirectReferral() {
    this.http
      .get<{ message: string; data: DirectReferral[] }>(
        SERVER_URL + 'api/direct-referral',
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.cache = [...data];
          this.store.dispatch(fetchDirectReferral({ list: data }));
        }
      });
  }
}
