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
  cashoutsStatus: boolean = false;
  purchasesStatus: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  editUser(user_info: {
    user_id: string | undefined;
    password?: string;
    role: string;
    secret_code_suffix: string | undefined;
    max_member_to_verify: number | undefined;
  }) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/edit-user',
        {
          ...user_info,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {});
  }
}
