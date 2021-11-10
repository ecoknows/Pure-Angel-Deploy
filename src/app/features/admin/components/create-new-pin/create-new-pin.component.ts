import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { CreateNewPinService } from '@core/services/create-new-pin.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-new-pin',
  templateUrl: './create-new-pin.component.html',
  styleUrls: ['./create-new-pin.component.sass'],
})
export class CreateNewPinComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  searchAccount$: Observable<UserState>;
  user$: Observable<UserState>;

  constructor(
    private _formBuilder: FormBuilder,
    private createNewPinService: CreateNewPinService,
    private authService: AuthService,
    private store: Store<{
      searchAccountReducer: UserState;
      userReducer: UserState;
    }>
  ) {
    this.searchAccount$ = this.store.select('searchAccountReducer');
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      account_number: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      addedPin: ['', Validators.required],
    });

    this.authService.fetchUserDetails();
  }

  searchAccount(stepper: any) {
    const account_number = this.firstFormGroup.get('account_number')?.value;

    if (account_number) {
      this.createNewPinService.searchAccount(account_number, stepper);
    }
  }

  createPIN() {
    const account_number = this.firstFormGroup.get('account_number')?.value;
    const addedPin = this.secondFormGroup.get('addedPin')?.value;
    if (account_number && addedPin) {
      this.createNewPinService.createPin(account_number, addedPin);
    }
  }

  startingPin(user: UserState | null) {
    if (user && user.ending_pin != undefined) {
      return user.ending_pin + 1;
    }

    return undefined;
  }
  endingPin(user: UserState | null) {
    const addedPin = this.secondFormGroup.get('addedPin')?.value;
    if (user && addedPin) {
      if (user.ending_pin != undefined && user.number_of_pin != undefined) {
        return user.ending_pin + addedPin + user.number_of_pin;
      }

      if (user.ending_pin == undefined && user.number_of_pin != undefined) {
        return addedPin + user.number_of_pin;
      }

      if (user.ending_pin != undefined && user.number_of_pin == undefined) {
        return user.ending_pin + addedPin;
      }
    }

    return undefined;
  }
  totalPins(user: UserState | null) {
    const addedPin = this.secondFormGroup.get('addedPin')?.value;
    if (user && addedPin) {
      if (user.number_of_pin != undefined) {
        return user.number_of_pin + addedPin;
      }
    }

    return addedPin;
  }

  yourCoffeeBox(user: UserState | null) {
    if (user) {
      if (user.stock_coffee != undefined) {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const minusCoffeeBox = addedPin * 5;
        const totalCoffeeBox = user.stock_coffee - minusCoffeeBox;
        return (
          user.stock_coffee.toString() +
          ' - ' +
          minusCoffeeBox.toString() +
          ' ( ' +
          totalCoffeeBox +
          ' Boxes ) '
        );
      }
    }

    return undefined;
  }

  yourSoapBox(user: UserState | null) {
    if (user) {
      if (user.stock_soap != undefined) {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const minusSoapBox = addedPin * 4;
        const totalSoapBox = user.stock_soap - minusSoapBox;
        return (
          user.stock_soap.toString() +
          ' - ' +
          minusSoapBox.toString() +
          ' ( ' +
          totalSoapBox +
          ' Boxes ) '
        );
      }
    }

    return undefined;
  }

  buyerCoffeeBox(user: UserState | null) {
    if (user) {
      if (user.stock_coffee != undefined) {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const addedCoffeBox = addedPin * 5;
        const totalCoffeeBox = user.stock_coffee + addedCoffeBox;
        return (
          user.stock_coffee.toString() +
          ' + ' +
          addedCoffeBox.toString() +
          ' ( ' +
          totalCoffeeBox +
          ' Boxes ) '
        );
      } else {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const addedCoffeBox = addedPin * 5;
        const totalCoffeeBox = addedCoffeBox;
        return (
          '0 + ' +
          addedCoffeBox.toString() +
          ' ( ' +
          totalCoffeeBox +
          ' Boxes ) '
        );
      }
    }

    return undefined;
  }

  buyerSoapBox(user: UserState | null) {
    if (user) {
      if (user.stock_soap != undefined) {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const addedSoapBox = addedPin * 4;
        const totalSoapBox = user.stock_soap + addedSoapBox;
        return (
          user.stock_soap.toString() +
          ' + ' +
          addedSoapBox.toString() +
          ' ( ' +
          totalSoapBox +
          ' Boxes ) '
        );
      } else {
        const addedPin = this.secondFormGroup.get('addedPin')?.value;
        const addedSoapBox = addedPin * 4;
        const totalSoapBox = addedSoapBox;
        return (
          '0 + ' + addedSoapBox.toString() + ' ( ' + totalSoapBox + ' Boxes ) '
        );
      }
    }

    return undefined;
  }
}
