import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IRows } from '@shared/components/table/table.component';
import { data } from './test-data';
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ReferralsComponent implements OnInit {
  direct_selling_rows: IRows = data;
  direct_referral_rows: IRows = data;
  indirect_referral_rows: IRows = data;

  constructor() {}

  ngOnInit(): void {}
}
