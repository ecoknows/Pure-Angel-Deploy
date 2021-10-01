import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerificationState } from '@core/redux/admin/verification/verification.reducers';
import { AdminService } from '@features/admin/services/admin.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CashoutDialogComponent } from '../cashout-dialog/cashout-dialog.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.sass'],
})
export class VerificationComponent implements OnInit {
  verifiedIcon: any;

  @Input('rows') rows: VerificationState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private adminService: AdminService, public dialog: MatDialog) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {}

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.adminService.verificationCache?.filter(function (d) {
      if (d.first_name) {
        return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
      }
      return null;
    });

    this.table.offset = 0;
  }

  cashout(user_info: VerificationState) {
    this.dialog.open(CashoutDialogComponent, {
      data: { user_info },
    });
  }

  get isDisabled() {
    return this.adminService.verificationStatus;
  }

  checkUser($event: any, secret_code: string) {
    this.adminService.verifyUser({
      secret_code,
      checked: $event.checked,
    });
  }
}
