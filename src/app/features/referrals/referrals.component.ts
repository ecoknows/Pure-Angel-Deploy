import { Component, OnInit } from '@angular/core';
import { UserCashoutsState } from '@core/redux/cashouts/user-cashouts.reducers';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { PairingBonusState } from '@core/redux/pairing-bonus/pairing-bonus.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.sass'],
})
export class ReferralsComponent implements OnInit {
  directReferralRows$: Observable<DirectReferralState[]>;
  indirectReferralRows$: Observable<IndirectReferralState[]>;
  pairingBonusRows$: Observable<PairingBonusState[]>;
  userCashoutsRow$: Observable<UserCashoutsState[]>;

  constructor(
    private store: Store<{
      directReferralReducer: DirectReferralState[];
      indirectReferralReducer: IndirectReferralState[];
      pairingBonusReducer: PairingBonusState[];
      userCashoutsReducer: UserCashoutsState[];
    }>
  ) {
    this.directReferralRows$ = this.store.select('directReferralReducer');
    this.indirectReferralRows$ = this.store.select('indirectReferralReducer');
    this.pairingBonusRows$ = this.store.select('pairingBonusReducer');
    this.userCashoutsRow$ = this.store.select('userCashoutsReducer');
  }

  ngOnInit(): void {}
}
