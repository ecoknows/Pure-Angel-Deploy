import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setSearchAccount } from '@core/redux/search-account/search-account.actions';
import { UserState } from '@core/redux/user/user.reducer';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { SnackbarComponent } from '@shared/components';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NewOrderService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>,
    private _snackBar: MatSnackBar
  ) {}

  order(
    order_info: {
      buyer: string;
      coffee_ordered: number;
      soap_ordered: number;
      package: string;
    },
    stepper: any,
    secondFormGroup: any
  ) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/new-order/order',
        {
          ...order_info,
        },
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.snackBarDuration * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-background'],
            data: {
              message: response.message,
            },
          });
          this.authService.fetchUserDetails();
          stepper.reset();
          secondFormGroup.patchValue({
            coffee_quantity: 0,
            soap_quantity: 0,
            package: 'b1t1',
          });
        },
        (error) => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.snackBarDuration * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-background'],
            data: {
              message: error.error.message,
              error: true,
            },
          });
        }
      );
  }

  searchAccount(account_number: string, stepper: any) {
    this.http
      .post<{ message: string; data: UserState }>(
        environment.api + 'api/new-order/search-account',
        {
          account_number,
        },
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          const data = response.data;

          if (data) {
            this._snackBar.openFromComponent(SnackbarComponent, {
              duration: this.snackBarDuration * 1000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar-background'],
              data: {
                message: response.message,
              },
            });

            this.store.dispatch(setSearchAccount({ user: data }));
            stepper.next();
          }
        },
        (error) => {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.snackBarDuration * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-background'],
            data: {
              message: error.error.message,
              error: true,
            },
          });
        }
      );
  }
}
