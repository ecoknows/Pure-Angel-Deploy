import { Component, OnInit } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { GenealogyService } from '@core/services/genealogy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private genealogyService: GenealogyService
  ) {}

  ngOnInit(): void {
    this.authService.fetchUserData();
    this.genealogyService.fetchGenealogy();
  }
}
