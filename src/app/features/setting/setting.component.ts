import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass'],
})
export class SettingComponent implements OnInit {
  form: FormGroup;
  user$: Observable<UserState>;
  matcher = new CommonErrorStateMatcher();
  old_hide = true;
  new_hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<{ userReducer: UserState }>
  ) {
    this.form = fb.group({
      old_password: ['', [Validators.maxLength(25), Validators.minLength(8)]],
      new_password: ['', [Validators.maxLength(25), Validators.minLength(8)]],
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
      birthdate: ['', Validators.required],
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
          Validators.minLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {
    this.authService.fetchUserData();
  }

  submit() {
    let old_password = this.form.get('old_password')?.value;
    let new_password = this.form.get('new_password')?.value;
    let first_name = this.form.get('first_name')?.value;
    let last_name = this.form.get('last_name')?.value;
    let birthdate = this.form.get('birthdate')?.value;
    let address = this.form.get('address')?.value;
    let contact_number = this.form.get('contact_number')?.value;

    let updatePerson = {
      old_password,
      new_password,
      first_name,
      last_name,
      birthdate,
      address,
      contact_number,
    };

    this.authService.updateUser(updatePerson);
  }
}
