import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@core/api';
import { setGenealogy } from '@core/redux/genealogy/genealogy.actions';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GenealogyService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ genealogyReducer: GenealogyState }>
  ) {}

  fetchGenealogy() {
    this.http
      .get<{ message: string; data: Genealogy }>(SERVER_URL + '/genealogy/', {
        headers: this.authService.headers,
      })
      .subscribe((result) => {
        let data = result.data;

        this.store.dispatch(setGenealogy({ genealogy: data }));
      });
  }

  addGenealogy(person: {
    first_name: string;
    last_name: string;
    birthdate: string;
    address: string;
  }) {
    this.http
      .post<{ message: string }>(SERVER_URL + '/genealogy/add', person, {
        headers: this.authService.headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
