import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MegaStockAdminGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const helper = new JwtHelperService();
    const token = this.authService.userToken;

    if (token) {
      const decode = helper.decodeToken(token);

      if (decode.is_admin || decode.is_mega_center || decode.is_stockist) {
        return true;
      }
    }

    return false;
  }
}
