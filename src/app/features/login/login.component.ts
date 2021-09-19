import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private sideBarService: SidebarService,
    private router: Router
  ) {
    this.form = fb.group({
      username: [''],
      password: [''],
    });
    this.sideBarService.hide();
  }

  submit() {
    let username = this.form.get('username');
    let password = this.form.get('password');
    this.authService.login(username?.value, password?.value);
    this.form.reset();
  }
}
