import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-approve-cashout-dialog',
  templateUrl: './approve-cashout-dialog.component.html',
  styleUrls: ['./approve-cashout-dialog.component.sass'],
})
export class ApproveCashoutDialogComponent {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      cashout_id: string;
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
    this.adminService.approvedCheckout({
      cashout_id: this.data.cashout_id,
      checked: this.data.checked,
      remarks,
    });
  }
}
