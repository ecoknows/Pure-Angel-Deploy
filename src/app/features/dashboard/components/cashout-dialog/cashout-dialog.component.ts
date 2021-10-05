import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cashout-dialog',
  templateUrl: './cashout-dialog.component.html',
  styleUrls: ['./cashout-dialog.component.sass'],
})
export class CashoutDialogComponent {
  overall_cash = 0;
  form: FormGroup;
  user$: Observable<UserState>;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<{ userReducer: UserState }>
  ) {
    this.form = fb.group({
      amount: [0],
    });
    this.user$ = this.store.select('userReducer');
  }

  cashout() {
    const amount = this.form.get('amount')?.value;
    this.authService.cashOut(amount);
  }
}
