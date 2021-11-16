import { Component, Input } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  COFFEE_B1T1_AE_REBATES,
  COFFEE_B2T3_AE_REBATES,
  SOAP_B1T1_AE_REBATES,
  SOAP_B2T3_AE_REBATES,
} from '@server/constants';

@Component({
  selector: 'app-referral-info',
  templateUrl: './referral-info.component.html',
  styleUrls: ['./referral-info.component.sass'],
})
export class ReferralInfoComponent {
  @Input('secondFormGroup') secondFormGroup!: FormGroup;
  referralUser$: Observable<UserState>;

  constructor(
    private store: Store<{
      searchReferralAccountReducer: UserState;
    }>
  ) {
    this.referralUser$ = this.store.select('searchReferralAccountReducer');
  }

  referralRebates() {
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        return (
          coffee_package * COFFEE_B1T1_AE_REBATES +
          soap_package * SOAP_B1T1_AE_REBATES
        );
      }

      if (package_order == 'b2t3') {
        return (
          coffee_package * COFFEE_B2T3_AE_REBATES +
          soap_package * SOAP_B2T3_AE_REBATES
        );
      }
    }

    return 0;
  }
}
