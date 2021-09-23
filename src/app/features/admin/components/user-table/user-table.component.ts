import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DirectReferral } from '@core/redux/direct-referral/direct-referral.model';
import { DirectReferralService } from '@core/services/direct-referral.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class UserTableComponent implements OnInit {
  @Input('rows') rows: DirectReferral[] | undefined = [];
  verifiedIcon: any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor() {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {}

  search(event: any) {
    // const val = event.target.value.toLowerCase();

    // this.rows = this.service.cache?.filter(function (d) {
    //   return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    this.table.offset = 0;
  }
}
