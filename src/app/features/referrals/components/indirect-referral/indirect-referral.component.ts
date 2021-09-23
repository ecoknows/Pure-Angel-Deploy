import { Component, OnInit } from '@angular/core';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { IndirectReferralService } from '@core/services/indirect-referral.service';
import { Store } from '@ngrx/store';
import { IColumns } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-indirect-referral',
  templateUrl: './indirect-referral.component.html',
  styleUrls: ['./indirect-referral.component.sass'],
})
export class IndirectReferralComponent implements OnInit {
  columns: IColumns = [
    {
      name: 'Name',
      width: 400,
    },
    {
      name: 'Age',
      width: 300,
    },
    {
      name: 'City',
      width: 300,
    },
  ];

  rows$: Observable<IndirectReferralState>;

  constructor(
    private store: Store<{ indirectSellingReducer: IndirectReferralState }>,
    private service: IndirectReferralService
  ) {
    this.rows$ = store.select('indirectSellingReducer');
  }

  ngOnInit(): void {}
}
