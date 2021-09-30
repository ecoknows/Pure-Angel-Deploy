import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DirectReferralState } from '@core/redux/direct-referral/direct-referral.reducers';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-direct-referral',
  templateUrl: './direct-referral.component.html',
  styleUrls: ['./direct-referral.component.sass'],
})
export class DirectReferralComponent implements OnInit {
  @Input('rows') rows: DirectReferralState[] | null = [];
  verifiedIcon: any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private directReferralService: DirectReferralService) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.directReferralService.fetchDirectReferral();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.directReferralService.cache?.filter(function (d) {
      return d.user.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.offset = 0;
  }
}
