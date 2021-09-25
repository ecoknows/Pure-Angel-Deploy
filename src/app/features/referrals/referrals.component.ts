import { Component, OnInit } from '@angular/core';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { IndirectReferralService } from '@core/services/indirect-referral.service';
import { Store } from '@ngrx/store';
import { IColumns, IRows } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { data } from './test-data';
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.sass'],
})
export class ReferralsComponent implements OnInit {
  directReferralRows$: Observable<DirectReferralState[]>;
  indirectReferralRows$: Observable<DirectReferralState[]>;

  constructor(
    private store: Store<{
      directReferralReducer: DirectReferralState[];
      indirectReferralReducer: IndirectReferralState[];
    }>
  ) {
    this.directReferralRows$ = this.store.select('directReferralReducer');
    this.indirectReferralRows$ = this.store.select('indirectReferralReducer');
  }

  ngOnInit(): void {}
}
