import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IndirectReferralState } from '@core/redux/indirect-referral/indirect-referral.reducers';
import { IndirectReferralService } from '@core/services/indirect-referral.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-indirect-referral',
  templateUrl: './indirect-referral.component.html',
  styleUrls: ['./indirect-referral.component.sass'],
})
export class IndirectReferralComponent implements OnInit {
  @Input('rows') rows: IndirectReferralState[] | null = [];
  verifiedIcon: any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private indirectReferralService: IndirectReferralService) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.indirectReferralService.fetchIndirectReferrals();
  }

  search($event: any) {}
}
