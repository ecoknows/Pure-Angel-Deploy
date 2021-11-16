import { Component, OnInit, Input } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  COFFEE_B1T1_SRP,
  COFFEE_B2T3_SRP,
  SOAP_B1T1_SRP,
  SOAP_B2T3_SRP,
} from '@server/constants';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.sass'],
})
export class BuyerInfoComponent implements OnInit {
  @Input('secondFormGroup') secondFormGroup!: FormGroup;
  searchAccount$: Observable<UserState>;

  constructor(
    private store: Store<{
      searchAccountReducer: UserState;
    }>
  ) {
    this.searchAccount$ = this.store.select('searchAccountReducer');
  }

  ngOnInit(): void {}

  orderCoffee() {
    const package_taken = this.secondFormGroup.get('package')?.value;
    const coffee_package = this.secondFormGroup.get('coffee_package')?.value;

    if (package_taken == 'b1t1' && coffee_package) {
      return (
        coffee_package.toString() +
        ' + ' +
        coffee_package.toString() +
        ' ( ' +
        (coffee_package * 2).toString() +
        ' Boxes )'
      );
    }

    if (package_taken == 'b2t3' && coffee_package) {
      return (
        (coffee_package * 2).toString() +
        ' + ' +
        (coffee_package * 3).toString() +
        ' ( ' +
        (coffee_package * 5).toString() +
        ' Boxes )'
      );
    }

    return '0 Boxes';
  }

  orderSoap() {
    const package_taken = this.secondFormGroup.get('package')?.value;
    const soap_package = this.secondFormGroup.get('soap_package')?.value;

    if (package_taken == 'b1t1' && soap_package) {
      return (
        soap_package.toString() +
        ' + ' +
        soap_package.toString() +
        ' ( ' +
        (soap_package * 2).toString() +
        ' Boxes )'
      );
    }

    if (package_taken == 'b2t3' && soap_package) {
      return (
        (soap_package * 2).toString() +
        ' + ' +
        (soap_package * 3).toString() +
        ' ( ' +
        (soap_package * 5).toString() +
        ' Boxes )'
      );
    }

    return '0 Boxes';
  }

  coffeeTotal() {
    const coffee_package =
      this.secondFormGroup.get('coffee_package')?.value || 0;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (coffee_package && package_order) {
      if (package_order == 'b1t1') {
        return coffee_package * COFFEE_B1T1_SRP;
      }

      if (package_order == 'b2t3') {
        return coffee_package * COFFEE_B2T3_SRP;
      }
    }

    return 0;
  }

  soapTotal() {
    const soap_package = this.secondFormGroup.get('soap_package')?.value;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        return soap_package * SOAP_B1T1_SRP;
      }

      if (package_order == 'b2t3') {
        return soap_package * SOAP_B2T3_SRP;
      }
    }

    return 0;
  }

  total() {
    const soap_package = this.secondFormGroup.get('soap_package')?.value || 0;
    const coffee_package =
      this.secondFormGroup.get('coffee_package')?.value || 0;
    const package_order = this.secondFormGroup.get('package')?.value;

    if (package_order) {
      if (package_order == 'b1t1') {
        return soap_package * SOAP_B1T1_SRP + coffee_package * COFFEE_B1T1_SRP;
      }

      if (package_order == 'b2t3') {
        return soap_package * SOAP_B2T3_SRP + coffee_package * COFFEE_B2T3_SRP;
      }
    }

    return 0;
  }
}
