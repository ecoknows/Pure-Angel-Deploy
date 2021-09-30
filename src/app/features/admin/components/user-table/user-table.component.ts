import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersTableState } from '@core/redux/admin/users-table.reducers';
import { AdminService } from '@features/admin/services/admin.service';
import { Store } from '@ngrx/store';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { CashoutDialogComponent } from '../cashout-dialog/cashout-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
})
export class UserTableComponent implements OnInit {
  verifiedIcon: any;

  @Input('rows') rows: UsersTableState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private adminService: AdminService, public dialog: MatDialog) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {}

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.adminService.userTableCache?.filter(function (d) {
      if (d.first_name) {
        return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
      }
      return null;
    });

    this.table.offset = 0;
  }

  cashout(user_info: UsersTableState) {
    this.dialog.open(CashoutDialogComponent, {
      data: { user_info },
    });
  }

  get isDisabled() {
    return this.adminService.userTableStatus;
  }

  checkUser($event: any, secret_code: string) {
    this.adminService.verifyUser({
      secret_code,
      checked: $event.checked,
    });
  }
}
