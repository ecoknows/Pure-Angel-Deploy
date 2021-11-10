import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import {
  resetSearchGenealogy,
  setSearchGenealogy,
  setSearchPlaceUnderAccount,
  setSearchReferralAccount,
} from '@core/redux/search-account/search-account.actions';
import { UserState } from '@core/redux/user/user.reducer';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { SnackbarComponent } from '@shared/components';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NewMemberService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>,
    private _snackBar: MatSnackBar
  ) {}

  resetGenealogy() {
    this.store.dispatch(resetSearchGenealogy());
  }

  searchGenealogy(account_number: string) {
    this.http
      .post<{ message: string; data: Genealogy }>(
        environment.api + 'api/new-member/search-genealogy',
        { account_number },
        { headers: this.authService.headers }
      )
      .subscribe(
        (response) => {
          let data = response.data;

          if (data == null) {
            data = { newly_created: true };
          }
          this.store.dispatch(setSearchGenealogy({ genealogy: data }));

          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.snackBarDuration * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-background'],
            data: {
              message: response.message,
            },
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

  searchReferralAccount(account_number: string) {
    this.http
      .post<{ message: string; data: UserState }>(
        environment.api + 'api/new-member/search-account',
        { account_number },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        let data = response.data;

        if (data) {
          this.store.dispatch(setSearchReferralAccount({ user: data }));
        }
      });
  }

  searchPlaceUnderAccount(account_number: string) {
    this.http
      .post<{ message: string; data: UserState }>(
        environment.api + 'api/new-member/search-account',
        { account_number },
        { headers: this.authService.headers }
      )
      .subscribe((response) => {
        let data = response.data;

        if (data) {
          this.store.dispatch(setSearchPlaceUnderAccount({ user: data }));
        }
      });
  }

  createMember(
    member_info: {
      account_number: string | null;
      user_number: number | null;
      place_under_account: string | null;
      referral_account: string | null;
      first_name: string | null;
      last_name: string | null;
      contact_number: string | null;
      position: string | null;
    },
    stepper: any
  ) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/new-member/create-member',
        { ...member_info },
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

          stepper.reset();
          this.authService.fetchUserDetails();
          this.store.dispatch(resetSearchGenealogy());
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
