import { Component, OnInit } from '@angular/core';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
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

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private store: Store<{
      verificationReducer: VerificationState[];
      authenticationReducer: AuthenticationState[];
    }>
  ) {
    this.verification$ = this.store.select('verificationReducer');
    this.authentication$ = this.store.select('authenticationReducer');
  }

  ngOnInit(): void {
    this.authService.fetchUserData();
    this.adminService.fetchVerificationTable();
    this.adminService.fetchAuthenticationTable();
  }
}
