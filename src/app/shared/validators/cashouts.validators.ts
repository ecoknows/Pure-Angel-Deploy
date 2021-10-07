import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { UserState } from '@core/redux/user/user.reducer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class CashoutValidators {
  static limitMoney(user$: Observable<UserState>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return user$.pipe(
        map((result: any) => {
          if (result.unpaid_income < control.value) {
            control.setErrors({ amountExceed: true });
          }
          return { amountExceed: true };
        })
      );
    };
  }
}

// export class CashoutValidators {
//   static createValidator(zipcodeService: ZipcodeService): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors> => {
//       return zipcodeService.fakeHttp(control.value).pipe(
//         map((result: boolean) => result ? null : {invalidAsync: true})
//       );
//     };
//   }
