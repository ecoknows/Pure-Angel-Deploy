import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setAutomaticEquivalentRebates } from '@core/redux/automatic-equivalent-rebates/automatic-equivalent-rebates.actions';
import { AutomaticEquivalentRebatesState } from '@core/redux/automatic-equivalent-rebates/automatic-equivalent-rebates.reducers';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutomaticEquivalentRebatesService {
  cache!: AutomaticEquivalentRebatesState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchAER() {
    this.http
      .get<{ message: string; data: AutomaticEquivalentRebatesState[] }>(
        environment.api + 'api/aer',
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;
          if (data) {
            this.store.dispatch(setAutomaticEquivalentRebates({ list: data }));
          }
        },
        (error) => {}
      );
  }
}
