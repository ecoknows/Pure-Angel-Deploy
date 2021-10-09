import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MemberVerificationState } from '@core/redux/mega-center/member-verification.reducers';
import { UserState } from '@core/redux/user/user.reducer';
import { AdminService } from '@features/admin/services/admin.service';
import { MegaCenterService } from '@features/mega-center/services/mega-center.service';
import { Store } from '@ngrx/store';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-verification',
  templateUrl: './member-verification.component.html',
  styleUrls: ['./member-verification.component.sass'],
})
export class MemberVerificationComponent implements OnInit {
  verifiedIcon: any;
  user$: Observable<UserState>;

  @Input('rows') rows: MemberVerificationState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(
    private megaCenterVerification: MegaCenterService,
    private store: Store<{ userReducer: UserState }>
  ) {
    this.verifiedIcon = getIcon('faUserCheck');
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {}

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.megaCenterVerification.memberVerificationCache?.filter(
      function (d) {
        if (d.first_name) {
          return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
        }
        return null;
      }
    );

    this.table.offset = 0;
  }

  get isDisabled() {
    return this.megaCenterVerification.memberVerificationStatus;
  }

  checkUser($event: any, secret_code: string, checkbox: any) {
    this.megaCenterVerification.verifyUser(
      {
        secret_code,
        checked: $event.checked,
      },
      checkbox
    );
  }
}
