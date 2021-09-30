import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenealogyService } from '@core/services/genealogy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass'],
})
export class CreateDialogComponent {
  form: FormGroup;
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
      root_id: this.data.root_id,
      first_name,
      last_name,
      birthdate,
      address,
      position: this.data.position,
    };
    this.genealogyService.addGenealogy(person);
  }
}
