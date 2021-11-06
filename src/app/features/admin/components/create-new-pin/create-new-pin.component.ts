import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
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

  constructor(
    private _formBuilder: FormBuilder,
    private createNewPinService: CreateNewPinService,
    private store: Store<{
      searchAccountReducer: UserState;
    }>
  ) {
    this.searchAccount$ = this.store.select('searchAccountReducer');
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      account_number: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      addedPin: ['', Validators.required],
    });
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

  startingPin(endingPin: number | undefined) {
    if (endingPin) {
      return endingPin + 1;
    }

    return undefined;
  }
  endingPin(endingPin: number | undefined) {
    if (endingPin) {
      const addedPin = this.secondFormGroup.get('addedPin')?.value;
      return endingPin + addedPin;
    }

    return undefined;
  }
}
