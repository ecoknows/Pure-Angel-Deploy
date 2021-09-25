import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { setGenealogy } from '@core/redux/genealogy/genealogy.actions';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { setUserData } from '@core/redux/user/user.actions';
import { UserState } from '@core/redux/user/user.reducer';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GenealogyService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ genealogyReducer: GenealogyState[] }>
  ) {}

  fetchDefaultGenealogy() {
    const helper = new JwtHelperService();
    const token = this.authService.userToken;

    if (token) {
      const user = helper.decodeToken(token);

      this.store.dispatch(
        setGenealogy({
          genealogy: {
            user_id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
          },
        })
      );

      this.store.dispatch(setUserData({ user }));
    }
  }

  fetchGenealogy() {
    this.http
      .get<{ message: string; data: Genealogy }>(
        environment.api + 'api/genealogy/',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((result) => {
        let data = result.data;

        if (data) {
          this.store.dispatch(setGenealogy({ genealogy: data }));
        } else {
          this.fetchDefaultGenealogy();
        }
      });
  }

  addGenealogy(person: {
    root_id: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    address: string;
    position: string;
  }) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/genealogy/add',
        person,
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        this.fetchGenealogy();
      });
  }
}
