import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent {
  isLinear = true;

  personalInfoGroup!: FormGroup;
  authenticationGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {
    this.sidebarService.hide();
  }

  ngOnInit() {
    this.personalInfoGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
    this.authenticationGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  get RegistrationInfo() {
    return {
      first_name: this.personalInfoGroup.get('first_name')?.value,
      last_name: this.personalInfoGroup.get('last_name')?.value,
      address: this.personalInfoGroup.get('address')?.value,
      birthdate: this.personalInfoGroup.get('birthdate')?.value,
      username: this.authenticationGroup.get('username')?.value,
      password: this.authenticationGroup.get('password')?.value,
    };
  }

  submit() {
    console.log(this.RegistrationInfo, 'test');

    this.authService.register(this.RegistrationInfo);
  }
}
