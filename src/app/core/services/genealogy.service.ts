import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  setGenealogy,
  fetchRoot,
} from '@core/redux/genealogy/genealogy.actions';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { setUserData } from '@core/redux/user/user.actions';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@shared/components';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '@shared/components/create-dialog/create-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GenealogyService {
  snackBarDuration = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  fetchDefaultGenealogy() {
    const helper = new JwtHelperService();
    const token = this.authService.userToken;

    if (token) {
      const user = helper.decodeToken(token);

      this.store.dispatch(
        setGenealogy({
          genealogy: {
            user_id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            left_count: 0,
            right_count: 0,
          },
        })
      );

      this.store.dispatch(setUserData({ user }));
    }
  }

  fetchGenealogy() {
    this.http
      .get<{ message: string; data: { root: Genealogy; leaves: Genealogy[] } }>(
        environment.api + 'api/genealogy/',
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((result) => {
        let data = result.data;

        if (data) {
          this.store.dispatch(setGenealogy({ genealogy: data.root }));
        } else {
          this.fetchDefaultGenealogy();
        }
      });
  }

  fetchLeaves(user_id: string | undefined, position: string) {
    this.http
      .post<{
        message: string;
        data: Genealogy;
        isReach: boolean;
      }>(
        environment.api + 'api/genealogy/fetch-leave',
        {
          user_id,
        },
        {
          headers: this.authService.headers,
        }
      )
      .subscribe((response) => {
        let data = response.data;

        if (response.isReach) {
          this.dialog.open(CreateDialogComponent, {
            data: { position: position, root_id: user_id },
          });
        } else {
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

            this.store.dispatch(fetchRoot({ root: data }));
          }
        }
      });
  }

  addGenealogy(person: {
    root_id: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    address: string;
    contact_number: string;
    position: string;
  }) {
    this.http
      .post<{ message: string }>(
        environment.api + 'api/genealogy/add',
        person,
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

          this.fetchGenealogy();
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
