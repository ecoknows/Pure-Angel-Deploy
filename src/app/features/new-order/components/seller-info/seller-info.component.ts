import { Component, OnInit, Input } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  ADMIN_PURCHASE_INCOME,
  COFFEE_B1T1_AE_REBATES,
  COFFEE_B1T1_MEGA_CENTER_INCOME,
  COFFEE_B1T1_STOCKIST_INCOME,
  COFFEE_B2T3_AE_REBATES,
  COFFEE_B2T3_MEGA_CENTER_INCOME,
  COFFEE_B2T3_STOCKIST_INCOME,
  SOAP_B1T1_AE_REBATES,
  SOAP_B1T1_MEGA_CENTER_INCOME,
  SOAP_B1T1_STOCKIST_INCOME,
  SOAP_B2T3_AE_REBATES,
  SOAP_B2T3_MEGA_CENTER_INCOME,
  SOAP_B2T3_STOCKIST_INCOME,
} from '@server/constants';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.sass'],
})
export class SellerInfoComponent implements OnInit {
  @Input('secondFormGroup') secondFormGroup!: FormGroup;

  user$: Observable<UserState>;
  referralUser$: Observable<UserState>;

  constructor(
    private store: Store<{
      searchAccountReducer: UserState;
      searchReferralAccountReducer: UserState;
      userReducer: UserState;
    }>
  ) {
    this.user$ = this.store.select('userReducer');
    this.referralUser$ = this.store.select('searchReferralAccountReducer');
  }

  ngOnInit(): void {}

  totalReceiveIncome(
    user: UserState | null,
    referral_account: UserState | null
  ) {
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        const coffee_rebates =
          user?.account_number == referral_account?.account_number
            ? coffee_package * COFFEE_B1T1_AE_REBATES
            : 0;
        const soap_rebates =
          user?.account_number == referral_account?.account_number
            ? soap_package * SOAP_B1T1_AE_REBATES
            : 0;

        const total_rebates = coffee_rebates + soap_rebates;

        if (user?.is_mega_center) {
          return (
            coffee_package * COFFEE_B1T1_MEGA_CENTER_INCOME +
            soap_package * SOAP_B1T1_MEGA_CENTER_INCOME +
            total_rebates
          );
        } else if (user?.is_stockist) {
          return (
            coffee_package * COFFEE_B1T1_STOCKIST_INCOME +
            soap_package * SOAP_B1T1_STOCKIST_INCOME +
            total_rebates
          );
        } else if (user?.is_admin) {
          return (
            coffee_package * 2 * ADMIN_PURCHASE_INCOME +
            soap_package * 2 * ADMIN_PURCHASE_INCOME +
            total_rebates
          );
        }
      }

      if (package_order == 'b2t3') {
        const coffee_rebates =
          user?.account_number == referral_account?.account_number
            ? coffee_package * COFFEE_B2T3_AE_REBATES
            : 0;
        const soap_rebates =
          user?.account_number == referral_account?.account_number
            ? soap_package * SOAP_B2T3_AE_REBATES
            : 0;

        const total_rebates = coffee_rebates + soap_rebates;
        if (user?.is_mega_center) {
          return (
            coffee_package * COFFEE_B2T3_MEGA_CENTER_INCOME +
            soap_package * SOAP_B2T3_MEGA_CENTER_INCOME +
            total_rebates
          );
        } else if (user?.is_stockist) {
          return (
            coffee_package * COFFEE_B2T3_STOCKIST_INCOME +
            soap_package * SOAP_B2T3_STOCKIST_INCOME +
            total_rebates
          );
        } else if (user?.is_admin) {
          return (
            coffee_package * 5 * ADMIN_PURCHASE_INCOME +
            soap_package * 5 * ADMIN_PURCHASE_INCOME +
            total_rebates
          );
        }
      }
    }

    return 0;
  }

  coffeeRebates(user: UserState | null) {
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        if (user?.is_mega_center) {
          return coffee_package * COFFEE_B1T1_MEGA_CENTER_INCOME;
        } else if (user?.is_stockist) {
          return coffee_package * COFFEE_B1T1_STOCKIST_INCOME;
        } else if (user?.is_admin) {
          return coffee_package * 2 * ADMIN_PURCHASE_INCOME;
        }
      }

      if (package_order == 'b2t3') {
        if (user?.is_mega_center) {
          return coffee_package * COFFEE_B2T3_MEGA_CENTER_INCOME;
        } else if (user?.is_stockist) {
          return coffee_package * COFFEE_B2T3_STOCKIST_INCOME;
        } else if (user?.is_admin) {
          return coffee_package * 5 * ADMIN_PURCHASE_INCOME;
        }
      }
    }

    return 0;
  }

  soapRebates(user: UserState | null) {
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        if (user?.is_mega_center) {
          return soap_package * SOAP_B1T1_MEGA_CENTER_INCOME;
        } else if (user?.is_stockist) {
          return soap_package * SOAP_B1T1_STOCKIST_INCOME;
        } else if (user?.is_admin) {
          return soap_package * 2 * ADMIN_PURCHASE_INCOME;
        }
      }

      if (package_order == 'b2t3') {
        if (user?.is_mega_center) {
          return soap_package * SOAP_B2T3_MEGA_CENTER_INCOME;
        } else if (user?.is_stockist) {
          return soap_package * SOAP_B2T3_STOCKIST_INCOME;
        } else if (user?.is_admin) {
          return soap_package * 5 * ADMIN_PURCHASE_INCOME;
        }
      }
    }

    return 0;
  }

  AERebates(user: UserState | null, referral_account: UserState | null) {
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        const coffee_rebates =
          user?.account_number == referral_account?.account_number
            ? coffee_package * COFFEE_B1T1_AE_REBATES
            : 0;
        const soap_rebates =
          user?.account_number == referral_account?.account_number
            ? soap_package * SOAP_B1T1_AE_REBATES
            : 0;

        const total_rebates = coffee_rebates + soap_rebates;
        if (user?.is_mega_center) {
          return total_rebates;
        } else if (user?.is_stockist) {
          return total_rebates;
        } else if (user?.is_admin) {
          return total_rebates;
        }
      }

      if (package_order == 'b2t3') {
        const coffee_rebates =
          user?.account_number == referral_account?.account_number
            ? coffee_package * COFFEE_B2T3_AE_REBATES
            : 0;
        const soap_rebates =
          user?.account_number == referral_account?.account_number
            ? soap_package * SOAP_B2T3_AE_REBATES
            : 0;

        const total_rebates = coffee_rebates + soap_rebates;
        if (user?.is_mega_center) {
          return total_rebates;
        } else if (user?.is_stockist) {
          return total_rebates;
        } else if (user?.is_admin) {
          return total_rebates;
        }
      }
    }

    return 0;
  }
}
