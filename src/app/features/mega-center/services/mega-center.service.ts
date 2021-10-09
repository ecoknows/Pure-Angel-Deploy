import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setMemberVerificationTable } from '@core/redux/mega-center/member-verification.actions';
import { MemberVerificationState } from '@core/redux/mega-center/member-verification.reducers';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MegaCenterService {
  memberVerificationStatus: boolean = false;
  memberVerificationCache!: MemberVerificationState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchMemberVerificationTable() {
    this.http
      .get<{ message: string; data: MemberVerificationState[] }>(
        environment.api + 'api/mega-center/members',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;

        if (data) {
          this.memberVerificationCache = [...data];

          this.store.dispatch(setMemberVerificationTable({ list: data }));
        }
      });
  }

  verifyUser(
    verification_info: { checked: string; secret_code: string },
    checkbox: any
  ) {
    this.memberVerificationStatus = true;
    this.http
      .post<{ message: string }>(
        environment.api + 'api/mega-center/verify',
        {
          secret_code: verification_info.secret_code,
          checked: verification_info.checked,
        },
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          this.memberVerificationStatus = false;
          this.fetchMemberVerificationTable();
        },
        (error) => {
          checkbox.checked = false;
          this.memberVerificationStatus = false;
        }
      );
  }
}
