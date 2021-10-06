import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserCashoutsState } from '@core/redux/cashouts/user-cashouts.reducers';
import { UserCashoutsService } from '@core/services/user-cashouts.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-user-cashouts',
  templateUrl: './user-cashouts.component.html',
  styleUrls: ['./user-cashouts.component.sass'],
})
export class UserCashoutsComponent implements OnInit {
  @Input('rows') rows: UserCashoutsState[] | null = [];
  approvedIcon: any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private userCashoutsService: UserCashoutsService) {
    this.approvedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.userCashoutsService.fetchUserCashouts();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.userCashoutsService.cache?.filter(function (d) {
      return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.offset = 0;
  }
}
