import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenealogyService } from '@core/services/genealogy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass'],
})
export class CreateDialogComponent {
  form: FormGroup;

  matcher = new CommonErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      position: string;
      root_id: string;
      direction_from_the_root: string;
    },
    private fb: FormBuilder,
    private genealogyService: GenealogyService
  ) {
    this.form = fb.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z-0-9 ]*$'),
        ],
      ],

      contact_number: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      direct_referral: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.pattern('^[A-Z]*$'),
        ],
      ],
    });
  }
  submit() {
    let first_name = this.form.get('first_name')?.value;
    let last_name = this.form.get('last_name')?.value;
    let contact_number = this.form.get('contact_number')?.value;
    let direct_referral = this.form.get('direct_referral')?.value;

    const person = {
      direct_referral,
      first_name,
      last_name,
      contact_number,
      position: this.data.position,
    };
    this.genealogyService.addGenealogy(person);
  }
}
