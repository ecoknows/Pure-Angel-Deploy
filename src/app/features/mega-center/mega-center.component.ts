import { Component, OnInit } from '@angular/core';
import { MemberVerificationState } from '@core/redux/mega-center/member-verification.reducers';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MegaCenterService } from './services/mega-center.service';

@Component({
  selector: 'app-mega-center',
  templateUrl: './mega-center.component.html',
  styleUrls: ['./mega-center.component.sass'],
})
export class MegaCenterComponent implements OnInit {
  verification$: Observable<MemberVerificationState[]>;

  constructor(
    private megaCenterService: MegaCenterService,
    private authService: AuthService,
    private store: Store<{
      memberVerificationReducer: MemberVerificationState[];
    }>
  ) {
    this.verification$ = this.store.select('memberVerificationReducer');
  }

  ngOnInit(): void {
    this.megaCenterService.fetchMemberVerificationTable();
    this.authService.fetchUserDetails();
  }
}
