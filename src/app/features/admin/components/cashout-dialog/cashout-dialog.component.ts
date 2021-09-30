import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersTableState } from '@core/redux/admin/users-table.reducers';
import { AdminService } from '@features/admin/services/admin.service';

@Component({
  selector: 'app-cashout-dialog',
  templateUrl: './cashout-dialog.component.html',
  styleUrls: ['./cashout-dialog.component.sass'],
})
export class CashoutDialogComponent implements OnInit {
  overall_cash = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user_info: {
        user_id?: string;
        first_name?: string;
        last_name?: string;

        direct_referral?: number;
        indirect_referral?: number;
        pairing_bonus?: number;
        automatic_equivalent_rebates?: number;
      };
    },
    private adminService: AdminService
  ) {
    this.overall_cash =
      (this.data.user_info.direct_referral || 0) +
      (this.data.user_info.indirect_referral || 0) +
      (this.data.user_info.pairing_bonus || 0) +
      (this.data.user_info.automatic_equivalent_rebates || 0);
  }

  ngOnInit(): void {}

  cashout(user_id: string | undefined) {
    if (user_id) {
      this.adminService.cashOutUser(user_id);
    }
  }
}
