import { Component, OnInit } from '@angular/core';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { Store } from '@ngrx/store';
import { IColumns } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-referral',
  templateUrl: './direct-referral.component.html',
  styleUrls: ['./direct-referral.component.sass'],
})
export class DirectReferralComponent implements OnInit {
  constructor(public service: DirectReferralService) {}

  ngOnInit(): void {
    this.service.fetchDirectReferral();
  }
}
