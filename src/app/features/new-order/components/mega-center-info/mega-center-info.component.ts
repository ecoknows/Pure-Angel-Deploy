import { Component, Input } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  B1T1_STOCKIST_ENCODE_NEW_ORDER,
  B2T3_STOCKIST_ENCODE_NEW_ORDER,
  COFFEE_B1T1_AE_REBATES,
  COFFEE_B2T3_AE_REBATES,
  SOAP_B1T1_AE_REBATES,
  SOAP_B2T3_AE_REBATES,
} from '@server/constants';

@Component({
  selector: 'app-mega-center-info',
  templateUrl: './mega-center-info.component.html',
  styleUrls: ['./mega-center-info.component.sass'],
})
export class MegaCenterInfoComponent {
  @Input('secondFormGroup') secondFormGroup!: FormGroup;
  megaCenterUser$: Observable<UserState>;

  constructor(
    private store: Store<{
      searchMegaCenterAccountReducer: UserState;
    }>
  ) {
    this.megaCenterUser$ = this.store.select('searchMegaCenterAccountReducer');
  }

  referralRebates() {
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        return (
          coffee_package * B1T1_STOCKIST_ENCODE_NEW_ORDER +
          soap_package * B1T1_STOCKIST_ENCODE_NEW_ORDER
        );
      }

      if (package_order == 'b2t3') {
        return (
          coffee_package * B2T3_STOCKIST_ENCODE_NEW_ORDER +
          soap_package * B2T3_STOCKIST_ENCODE_NEW_ORDER
        );
      }
    }

    return 0;
  }
}
