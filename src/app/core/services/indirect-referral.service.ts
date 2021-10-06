import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setIndirectReferral } from '@core/redux/indirect-referral/indirect-referral.actions';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IndirectReferralService {
  cache!: IndirectReferralState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchIndirectReferrals() {
    this.http
      .get<{ message: string; data: IndirectReferralState[] }>(
        environment.api + 'api/indirect-referral',
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        const data = response.data;

        if (data) {
          this.cache = [...data];
          this.store.dispatch(setIndirectReferral({ list: data }));
        }
      });
  }
}
