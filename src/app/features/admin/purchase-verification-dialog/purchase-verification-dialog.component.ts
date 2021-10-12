import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-purchase-verification-dialog',
  templateUrl: './purchase-verification-dialog.component.html',
  styleUrls: ['./purchase-verification-dialog.component.sass'],
})
export class PurchaseVerificationDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      purchase_id: string;
      checked: boolean;
    },
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = fb.group({
      remarks: [''],
    });
  }

  submit() {
    const remarks = this.form.get('remarks')?.value;

    this.adminService.verifyPurchase({
      purchase_id: this.data.purchase_id,
      checked: this.data.checked,
      remarks,
    });
  }
}
