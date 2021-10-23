import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { AuthService } from '@core/services/auth.service';
import { GenealogyService } from '@core/services/genealogy.service';
import { Store } from '@ngrx/store';
import { getIcon } from '@shared/components/icons';
import { Observable } from 'rxjs';
import { UserState } from '@core/redux/user/user.reducer';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.sass'],
})
export class GenealogyComponent implements OnInit {
  genealogy$: Observable<GenealogyState>;
  user$: Observable<UserState>;
  iconButton: any;

  constructor(
    private store: Store<{
      genealogyReducer: GenealogyState;
      userReducer: UserState;
    }>,
    public genealogyService: GenealogyService,
    private authService: AuthService
  ) {
    this.genealogy$ = this.store.select('genealogyReducer');
    this.user$ = this.store.select('userReducer');
    this.iconButton = getIcon('faUserPlus');
  }

  ngOnInit(): void {
    this.genealogyService.fetchGenealogy();
    this.authService.fetchUserData();
    this.genealogyService.autoScroll = true;
  }
}
