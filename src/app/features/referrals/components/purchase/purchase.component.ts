import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPurchaseState } from '@core/redux/purchase/user-purchase.reducers';
import { PurchaseService } from '@core/services/purchase.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PurchaseDialogComponent } from './components/purchase-dialog/purchase-dialog.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass'],
})
export class PurchaseComponent implements OnInit {
  verifiedIcon: any;

  @Input('rows') rows: UserPurchaseState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog
  ) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.purchaseService.fetchPurchase();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.purchaseService.cache?.filter(function (d) {
      return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.offset = 0;
  }

  purchase() {
    this.dialog.open(PurchaseDialogComponent);
  }
}
