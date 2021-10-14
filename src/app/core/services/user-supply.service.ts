import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { SnackbarComponent } from '@shared/components';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserSupplyService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>,
    private _snackBar: MatSnackBar
  ) {}

  supply(amount: number) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/user-supply/supply',
        {
          supply: amount,
        },
        {
          headers: this.authService.headers,
        }
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
