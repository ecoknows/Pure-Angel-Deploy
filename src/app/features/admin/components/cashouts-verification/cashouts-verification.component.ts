import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CashoutsState } from '@core/redux/admin/cashouts-verification/cashouts.reducers';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@features/admin/services/admin.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-cashouts-verification',
  templateUrl: './cashouts-verification.component.html',
  styleUrls: ['./cashouts-verification.component.sass'],
})
export class CashoutsVerificationComponent implements OnInit {
  approvedIcon: any;
  @Input('rows') rows: CashoutsState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private adminService: AdminService, public dialog: MatDialog) {
    this.approvedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {}

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.adminService.cashoutsCache?.filter(function (d) {
      if (d.first_name) {
        return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
      }
      return null;
    });

    this.table.offset = 0;
  }

  get isDisabled() {
    return this.adminService.cashoutsStatus;
  }

  approvedCashout($event: any, cashout_id: string) {
    this.adminService.approvedCheckout({
      cashout_id,
      checked: $event.checked,
    });
  }
}
