import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegisterValidators {
  static confirmPasswordMustMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    if (
      control.get('password')?.value != control.get('confirm_password')?.value
    ) {
      control
        .get('confirm_password')
        ?.setErrors({ confirmPasswordMustMatch: true });
    } else {
      control.get('confirm_password')?.setErrors(null);
    }

    return null;
  }
}
