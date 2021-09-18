import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fetchItem } from '@core/redux/direct-selling/direct-selling.actions';
import { DirectSellingState } from '@core/redux/direct-selling/direct-selling.reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DirectSellingService {
  constructor(
    private http: HttpClient,
    private store: Store<{ directSellingReducer: DirectSellingState }>
  ) {}

  getTable() {
    this.http
      .get<{ message: string; list: any }>(
        'http://localhost:3000/api/direct-selling/'
      )
      .subscribe((result) => {
        this.store.dispatch(fetchItem({ list: result.list }));
      });
  }
}
