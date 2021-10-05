import { Component, OnInit } from '@angular/core';
import { UserState } from '@core/redux/user/user.reducer';
import { AuthService } from '@core/services/auth.service';
import { GenealogyService } from '@core/services/genealogy.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CashoutDialogComponent } from './components/cashout-dialog/cashout-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<UserState>;

  constructor(
    private authService: AuthService,
    private genealogyService: GenealogyService,
    private store: Store<{ userReducer: UserState }>,
    public dialog: MatDialog
  ) {
    this.user$ = this.store.select('userReducer');
  }

  ngOnInit(): void {
    this.authService.fetchUserIncome();
    this.genealogyService.fetchGenealogy();
  }

  cashout() {
    this.dialog.open(CashoutDialogComponent);
  }
}
