import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPurchaseState } from '@core/redux/purchase/user-purchase.reducers';
import { PurchaseService } from '@core/services/purchase.service';
import { PurchaseVerificationDialogComponent } from '@features/admin/purchase-verification-dialog/purchase-verification-dialog.component';
import { AdminService } from '@features/admin/services/admin.service';
import { PurchaseDialogComponent } from '@features/referrals/components/purchase/components/purchase-dialog/purchase-dialog.component';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-purchase-verification',
  templateUrl: './purchase-verification.component.html',
  styleUrls: ['./purchase-verification.component.sass'],
})
export class PurchaseVerificationComponent implements OnInit {
  verifiedIcon: any;

  @Input('rows') rows: UserPurchaseState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(
    private purchaseService: PurchaseService,
    private adminService: AdminService,
    public dialog: MatDialog
  ) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.purchaseService.fetchPurchase();
  }

  get isDisabled() {
    return this.adminService.purchasesStatus;
  }

  verifyPurchase($event: any, purchase_id: string, checkbox: any) {
    if (checkbox.checked == true) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
    this.dialog.open(PurchaseVerificationDialogComponent, {
      data: {
        purchase_id,
        checked: $event.checked,
      },
    });
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.purchaseService.cache?.filter(function (d) {
      return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.offset = 0;
  }
}
