import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
import { AdminService } from '@features/admin/services/admin.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass'],
})
export class AuthenticationComponent implements OnInit {
  userIcon: any;
  @Input('rows') rows: AuthenticationState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private adminService: AdminService, public dialog: MatDialog) {
    this.userIcon = getIcon('faUser');
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

  edit_user(user_info: AuthenticationState) {
    this.dialog.open(EditUserDialogComponent, {
      width: '300px',
      data: { user_info },
    });
  }
}
