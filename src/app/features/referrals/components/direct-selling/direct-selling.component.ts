import { Component, OnInit } from '@angular/core';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { Store } from '@ngrx/store';
import { IColumns } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-selling',
  templateUrl: './direct-selling.component.html',
  styleUrls: ['./direct-selling.component.sass'],
})
export class DirectSellingComponent implements OnInit {
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

  rows$: Observable<DirectReferralState>;

  constructor(
    private store: Store<{ directSellingReducer: DirectReferralState }>
  ) {
    this.rows$ = this.store.select('directSellingReducer');
  }

  ngOnInit(): void {}
}
