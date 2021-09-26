import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setPairingBonus } from '@core/redux/pairing-bonus/pairing-bonus.actions';
import { PairingBonusState } from '@core/redux/pairing-bonus/pairing-bonus.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PairingBonusService {
  cache!: PairingBonusState[];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ pairingBonusReducer: PairingBonusState[] }>
  ) {}

  fetchPairingBonus() {
    this.http
      .get<{ message: string; data: PairingBonusState[] }>(
        environment.api + 'api/pairing-bonus',
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.cache = [...data];
          this.store.dispatch(setPairingBonus({ list: data }));
        }
      });
  }
}
