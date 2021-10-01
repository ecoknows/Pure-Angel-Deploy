import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private store: Store<{ verificationReducer: VerificationState[] }>
  ) {
    this.verification$ = this.store.select('verificationReducer');
  }

  ngOnInit(): void {
    this.authService.fetchUserData();
    this.adminService.fetchVerificationTable();
  }
}
