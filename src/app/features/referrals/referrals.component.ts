import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DirectSellingState } from '@core/redux/direct-selling/direct-selling.reducers';
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
  direct_referral_columns: IColumns = [
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

  indirect_referral_columns: IColumns = [
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

  pairing_bonus_columns: IColumns = [
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

  automatic_equivalent_rebates_columns: IColumns = [
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

  direct_referral_rows: IRows = data;
  indirect_referral_rows: IRows = data;
  pairing_bonus_rows: IRows = data;
  automatic_equivalent_rebates_rows: IRows = data;

  constructor() {}

  ngOnInit(): void {}
}
