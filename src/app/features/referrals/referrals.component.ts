import { Component, OnInit } from '@angular/core';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { IColumns, IRows } from '@shared/components/table/table.component';
import { data } from './test-data';
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.sass'],
})
export class ReferralsComponent implements OnInit {
  constructor(public directReferralService: DirectReferralService) {}

  ngOnInit(): void {}
}
