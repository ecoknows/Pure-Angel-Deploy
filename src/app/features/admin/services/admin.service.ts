import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setUsersTable } from '@core/redux/admin/users-table.actions';
import { UsersTableState } from '@core/redux/admin/users-table.reducers';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userTableStatus: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{ usersTableReducer: UsersTableState[] }>
  ) {}

  fetchUsersTable() {
    this.http
      .get<{ message: string; data: UsersTableState[] }>(
        environment.api + 'api/admin/users',
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
    this.userTableStatus = true;
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/verify',
        {
          secret_code: verification_info.secret_code,
          checked: verification_info.checked,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.userTableStatus = false;
        this.fetchUsersTable();
      });
  }
}
