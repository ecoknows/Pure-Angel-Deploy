import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setAuthenticationTable } from '@core/redux/admin/authentication/authentication.actions';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
import { setVerificationTable } from '@core/redux/admin/verification/verification.actions';
import { VerificationState } from '@core/redux/admin/verification/verification.reducers';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  verificationStatus: boolean = false;
  verificationCache!: VerificationState[];

  authenticationCache!: VerificationState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{
      verificationReducer: VerificationState[];
      authenticationReducer: AuthenticationState[];
    }>
  ) {}

  fetchVerificationTable() {
    this.http
      .get<{ message: string; data: VerificationState[] }>(
        environment.api + 'api/admin/users',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;

        if (data) {
          this.verificationCache = [...data];

          this.store.dispatch(setVerificationTable({ list: data }));
        }
      });
  }

  fetchAuthenticationTable() {
    this.http
      .get<{ message: string; data: AuthenticationState[] }>(
        environment.api + 'api/admin/authentication',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;
        console.log(data);

        if (data) {
          this.authenticationCache = [...data];

          this.store.dispatch(setAuthenticationTable({ list: data }));
        }
      });
  }

  verifyUser(verification_info: { checked: boolean; secret_code: string }) {
    this.verificationStatus = true;
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
        this.verificationStatus = false;
        this.fetchVerificationTable();
      });
  }

  cashOutUser(user_id: string) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/cashout',
        { user_id },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.fetchVerificationTable();
      });
  }

  editUser(user_info: {
    user_id: string | undefined;
    password?: string;
    role: string;
  }) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/edit-user',
        {
          ...user_info,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.fetchAuthenticationTable();
      });
  }
}
