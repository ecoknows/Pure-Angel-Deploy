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
      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(2),
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
      birthdate: ['', [Validators.required]],
    });
  }
  submit() {
    let first_name = this.form.get('first_name')?.value;
    let last_name = this.form.get('last_name')?.value;
    let birthdate = this.form.get('birthdate')?.value;
    let address = this.form.get('address')?.value;
    let contact_number = this.form.get('contact_number')?.value;

    const person = {
      root_id: this.data.root_id,
      first_name,
      last_name,
      birthdate,
      address,
      contact_number,
      position: this.data.position,
    };
    this.genealogyService.addGenealogy(person);
  }
}
