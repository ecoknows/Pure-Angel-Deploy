import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewPinState } from '@core/redux/create-new-pin/create-new-pin.reducers';
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
  createNewPin$: Observable<CreateNewPinState>;

  constructor(
    private _formBuilder: FormBuilder,
    private createNewPinService: CreateNewPinService,
    private store: Store<{ createNewPinReducer: CreateNewPinState }>
  ) {
    this.createNewPin$ = this.store.select('createNewPinReducer');
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      accountNumber: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      addedPin: ['', Validators.required],
    });
  }

  searchAccount(stepper: any) {
    const accountNumber = this.firstFormGroup.get('accountNumber')?.value;
    const addedPin = this.secondFormGroup.get('addedPin')?.value;
    this.createNewPinService.findAccount(accountNumber, stepper);
  }

  createPIN() {
    const accountNumber = this.firstFormGroup.get('accountNumber')?.value;
    const addedPin = this.secondFormGroup.get('addedPin')?.value;
    this.createNewPinService.createPin(accountNumber, addedPin);
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
