import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
import { UserSupplyService } from '@core/services/user-supply.service';
import { Store } from '@ngrx/store';
import { LimitValidators } from '@shared/validators/limit.validators';
import { CommonErrorStateMatcher } from '@shared/validators/login.validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supply-dialog',
  templateUrl: './supply-dialog.component.html',
  styleUrls: ['./supply-dialog.component.sass'],
})
export class SupplyDialogComponent {
  overall_cash = 0;
  form: FormGroup;
  user$: Observable<UserState>;

  matcher = new CommonErrorStateMatcher();
  constructor(
    private userSupplyService: UserSupplyService,
    private fb: FormBuilder,
    private store: Store<{ userReducer: UserState }>
  ) {
    this.user$ = this.store.select('userReducer');
    this.form = fb.group({
      amount: [0, LimitValidators.limitSupply],
    });
  }

  supply() {
    const amount = this.form.get('amount')?.value;
    this.userSupplyService.supply(amount);
  }
}
