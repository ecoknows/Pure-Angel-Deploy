import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MegaCenterService {
  memberVerificationStatus: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<{}>
  ) {}
}
