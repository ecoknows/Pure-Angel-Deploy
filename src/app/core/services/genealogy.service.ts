import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@core/api';
import { setGenealogy } from '@core/redux/genealogy/genealogy.actions';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { setUserData } from '@core/redux/user/user.actions';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GenealogyService {
  canAddBranch: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ genealogyReducer: GenealogyState }>
  ) {}

  fetchDefaultGenealogy() {
    this.http
      .get<{ message: string; data: UserState }>(SERVER_URL + '/user/profile', {
        headers: this.authService.headers,
      })
      .subscribe((response) => {
        const data = response.data;
        this.store.dispatch(setUserData({ user: data }));
        this.store.dispatch(
          setGenealogy({
            genealogy: {
              _id: data._id,
              first_name: data.first_name,
              last_name: data.last_name,
              address: data.address,
              branches: [],
            },
          })
        );
      });
  }

  fetchGenealogy() {
    this.http
      .get<{ message: string; data: Genealogy }>(SERVER_URL + '/genealogy/', {
        headers: this.authService.headers,
      })
      .subscribe((result) => {
        let data = result.data;
        console.log(result, 'FETCH');

        if (data) {
          if (data.branches?.length) {
            if (data.branches.length < 2) {
              this.canAddBranch = true;
            }
          }

          this.store.dispatch(setGenealogy({ genealogy: data }));
        } else {
          this.canAddBranch = true;
          this.fetchDefaultGenealogy();
        }
      });
  }

  addGenealogy(person: {
    first_name: string;
    last_name: string;
    birthdate: string;
    address: string;
  }) {
    this.canAddBranch = false;
    this.http
      .post<{ message: string }>(SERVER_URL + '/genealogy/add', person, {
        headers: this.authService.headers,
      })
      .subscribe((response) => {
        this.fetchGenealogy();
      });
  }
}
