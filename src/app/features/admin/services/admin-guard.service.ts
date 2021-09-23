import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.user$.pipe(
      map((user: UserState) => {
        if (user.is_admin) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}
