import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenealogyService } from '@core/services/genealogy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
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
      direct_referral: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.pattern('^[A-Z0-9]*$'),
        ],
      ],
    });
  }
  submit() {
    let direct_referral = this.form.get('direct_referral')?.value;
  }
}
