import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenealogyService } from '@core/services/genealogy.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass'],
})
export class CreateDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private genealogyService: GenealogyService
  ) {
    this.form = fb.group({
      first_name: [''],
      last_name: [''],
      birthdate: [''],
      address: [''],
    });
  }
  submit() {
    let first_name = this.form.get('first_name')?.value;
    let last_name = this.form.get('last_name')?.value;
    let birthdate = this.form.get('birthdate')?.value;
    let address = this.form.get('address')?.value;
    const person = {
      first_name,
      last_name,
      birthdate,
      address,
    };
    this.genealogyService.addGenealogy(person);
  }
}
