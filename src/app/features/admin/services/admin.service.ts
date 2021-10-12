import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setAuthenticationTable } from '@core/redux/admin/authentication/authentication.actions';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
import { setCashoutsTable } from '@core/redux/admin/cashouts-verification/cashouts.actions';
import { CashoutsState } from '@core/redux/admin/cashouts-verification/cashouts.reducers';
import { setPurchaseTable } from '@core/redux/admin/purchase-verification/purchase.actions';
import { PurchaseState } from '@core/redux/admin/purchase-verification/purchase.reducers';
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
  verificationCache!: VerificationState[];

  authenticationCache!: AuthenticationState[];
  purchasesCache!: PurchaseState[];
  cashoutsCache!: CashoutsState[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}

  fetchCashoutsTable() {
    this.http
      .get<{ message: string; data: CashoutsState[] }>(
        environment.api + 'api/admin/cashouts',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;

        if (data) {
          this.cashoutsCache = [...data];

          this.store.dispatch(setCashoutsTable({ list: data }));
        }
      });
  }

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
        if (data) {
          this.authenticationCache = [...data];

          this.store.dispatch(setAuthenticationTable({ list: data }));
        }
      });
  }

  fetchPurchasesTable() {
    this.http
      .get<{ message: string; data: PurchaseState[] }>(
        environment.api + 'api/admin/purchases',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.purchasesCache = [...data];

          this.store.dispatch(setPurchaseTable({ list: data }));
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
      .subscribe(
        (response) => {
          this.verificationStatus = false;
          this.fetchVerificationTable();
        },
        (error) => {
          this.verificationStatus = false;
        }
      );
  }

  approvedCheckout(checkout_info: {
    checked: boolean;
    cashout_id: string;
    remarks: string;
  }) {
    this.cashoutsStatus = true;
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/approved-cashout',
        {
          cashout_id: checkout_info.cashout_id,
          checked: checkout_info.checked,
          remarks: checkout_info.remarks,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.cashoutsStatus = false;
        this.fetchCashoutsTable();
      });
  }

  verifyPurchase(purchase_info: {
    checked: boolean;
    purchase_id: string;
    remarks: string;
  }) {
    this.purchasesStatus = true;
    this.http
      .post<{ message: string }>(
        environment.api + 'api/admin/approved-purchase',
        {
          purchase_id: purchase_info.purchase_id,
          checked: purchase_info.checked,
          remarks: purchase_info.remarks,
        },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        this.purchasesStatus = false;
        this.fetchPurchasesTable();
      });
  }

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
      .subscribe((response) => {
        this.fetchAuthenticationTable();
      });
  }
}
