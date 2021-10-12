import { Component, OnInit } from '@angular/core';
import { AutomaticEquivalentRebatesState } from '@core/redux/automatic-equivalent-rebates/automatic-equivalent-rebates.reducers';
import { UserCashoutsState } from '@core/redux/cashouts/user-cashouts.reducers';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { PairingBonusState } from '@core/redux/pairing-bonus/pairing-bonus.reducers';
import { UserPurchaseState } from '@core/redux/purchase/user-purchase.reducers';
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
  purchasesRow$: Observable<UserPurchaseState[]>;
  aerRows$: Observable<AutomaticEquivalentRebatesState[]>;

  constructor(
    private store: Store<{
      directReferralReducer: DirectReferralState[];
      indirectReferralReducer: IndirectReferralState[];
      pairingBonusReducer: PairingBonusState[];
      userCashoutsReducer: UserCashoutsState[];
      userPurchaseReducer: UserPurchaseState[];
      automaticEquivalentRebatesReducer: AutomaticEquivalentRebatesState[];
    }>
  ) {
    this.directReferralRows$ = this.store.select('directReferralReducer');
    this.indirectReferralRows$ = this.store.select('indirectReferralReducer');
    this.pairingBonusRows$ = this.store.select('pairingBonusReducer');
    this.userCashoutsRow$ = this.store.select('userCashoutsReducer');
    this.purchasesRow$ = this.store.select('userPurchaseReducer');
    this.aerRows$ = this.store.select('automaticEquivalentRebatesReducer');
  }

  ngOnInit(): void {}
}
