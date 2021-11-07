import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MegaCenterService } from './services/mega-center.service';

@Component({
  selector: 'app-mega-center',
  templateUrl: './mega-center.component.html',
  styleUrls: ['./mega-center.component.sass'],
})
export class MegaCenterComponent implements OnInit {
  constructor(
    private megaCenterService: MegaCenterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.fetchUserDetails();
  }
}
