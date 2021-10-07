import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';
import { RegisterValidators } from '@shared/validators/register.validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent {
  isLinear = true;

  personalInfoGroup!: FormGroup;
  authenticationGroup!: FormGroup;

  matcher = new CommonErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {
    this.sidebarService.hide();
  }

  ngOnInit() {
    this.personalInfoGroup = this.fb.group({
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
      birthdate: ['', Validators.required],
      secret_code: ['', Validators.required],
    });
    this.authenticationGroup = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(4),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(8),
          ],
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validators: RegisterValidators.confirmPasswordMustMatch,
      }
    );
  }

  get RegistrationInfo() {
    return {
      first_name: this.personalInfoGroup.get('first_name')?.value,
      last_name: this.personalInfoGroup.get('last_name')?.value,
      address: this.personalInfoGroup.get('address')?.value,
      secret_code: this.personalInfoGroup.get('secret_code')?.value,
      birthdate: this.personalInfoGroup.get('birthdate')?.value,
      username: this.authenticationGroup.get('username')?.value,
      password: this.authenticationGroup.get('password')?.value,
    };
  }

  submit() {
    this.authService.register(this.RegistrationInfo);
  }
}
