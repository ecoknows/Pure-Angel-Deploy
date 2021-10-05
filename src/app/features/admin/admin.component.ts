import { Component, OnInit } from '@angular/core';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
import { CashoutsState } from '@core/redux/admin/cashouts-verification/cashouts.reducers';
import { VerificationState } from '@core/redux/admin/verification/verification.reducers';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  verification$: Observable<VerificationState[]>;
  authentication$: Observable<AuthenticationState[]>;
  cashouts$: Observable<CashoutsState[]>;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private store: Store<{
      verificationReducer: VerificationState[];
      authenticationReducer: AuthenticationState[];
      cashoutsReducer: CashoutsState[];
    }>
  ) {
    this.verification$ = this.store.select('verificationReducer');
    this.authentication$ = this.store.select('authenticationReducer');
    this.cashouts$ = this.store.select('cashoutsReducer');
  }

  ngOnInit(): void {
    this.authService.fetchUserIncome();
    this.adminService.fetchVerificationTable();
    this.adminService.fetchAuthenticationTable();
    this.adminService.fetchCashoutsTable();
  }
}
