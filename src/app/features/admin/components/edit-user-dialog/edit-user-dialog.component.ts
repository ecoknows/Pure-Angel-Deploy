import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationState } from '@core/redux/admin/authentication/authentications.reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@features/admin/services/admin.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.sass'],
})
export class EditUserDialogComponent implements OnInit {
  form: FormGroup;
  selectedRole!: string;

  roles = [
    { value: 'member', viewValue: 'Member' },
    { value: 'admin', viewValue: 'Admin' },
    { value: 'mega center', viewValue: 'Mega Center' },
    { value: 'stockist', viewValue: 'Stockist' },
  ];

  userRole = this.roles[0].value;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user_info: AuthenticationState;
    },
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = fb.group({
      new_password: [''],
      confirm_password: [''],
      role: ['member'],
      mega_center_code: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.user_info?.is_admin) {
      this.form.patchValue({
        role: this.roles[1].value,
      });
    } else if (this.data.user_info?.is_mega_center) {
      this.form.patchValue({
        role: this.roles[2].value,
      });
    } else if (this.data.user_info?.is_stockist) {
      this.form.patchValue({
        role: this.roles[3].value,
      });
    }
  }

  submit() {
    const new_password = this.form.get('new_password')?.value;
    const confirm_password = this.form.get('confirm_password')?.value;
    const role = this.form.get('role')?.value;
    const secret_code_suffix = this.form.get('mega_center_code')?.value;

    this.adminService.editUser({
      user_id: this.data.user_info._id,
      password: new_password ? new_password : undefined,
      role,
      secret_code_suffix,
    });
  }
}
