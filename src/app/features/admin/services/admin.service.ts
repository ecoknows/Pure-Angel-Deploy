import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@core/api';
import { setUsersTable } from '@core/redux/admin/users-table.actions';
import { UsersTableState } from '@core/redux/admin/users-table.reducers';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ usersTableReducer: UsersTableState }>
  ) {}

  fetchUsersTable() {
    this.http
      .get<{ message: string; data: UsersTableState[] }>(
        SERVER_URL + 'api/admin/users',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.store.dispatch(setUsersTable({ list: data }));
        }
      });
  }

  verifyUser(verification_info: { checked: boolean; secret_code: string }) {
    this.http
      .post<{ message: string }>(
        SERVER_URL + 'api/admin/verify',
        {
          secret_code: verification_info.secret_code,
          checked: verification_info.checked,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.fetchUsersTable();
      });
  }
}
