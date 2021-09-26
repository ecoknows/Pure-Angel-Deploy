import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersTableState } from '@core/redux/admin/users-table.reducers';
import { AdminService } from '@features/admin/services/admin.service';
import { Store } from '@ngrx/store';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
})
export class UserTableComponent implements OnInit {
  verifiedIcon: any;

  usersTable$: Observable<UsersTableState[]>;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(
    private store: Store<{ usersTableReducer: UsersTableState[] }>,
    private adminService: AdminService
  ) {
    this.verifiedIcon = getIcon('faUserCheck');
    this.usersTable$ = this.store.select('usersTableReducer');
  }

  ngOnInit(): void {}

  search(event: any) {
    // const val = event.target.value.toLowerCase();

    // this.rows = this.service.cache?.filter(function (d) {
    //   return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    this.table.offset = 0;
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
