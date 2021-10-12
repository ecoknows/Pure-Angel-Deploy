import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '@core/services/purchase.service';
import { LimitValidators } from '@shared/validators/limit.validators';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.sass'],
})
export class PurchaseDialogComponent implements OnInit {
  form: FormGroup;
  matcher = new CommonErrorStateMatcher();
  purchase_value = 350;

  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService
  ) {
    this.form = this.fb.group({
      quantity: ['', LimitValidators.limitPurchase],
    });
  }

  ngOnInit(): void {}

  purchase() {
    const quantity = this.form.get('quantity')?.value;
    this.purchaseService.purchase(quantity);
  }
}
