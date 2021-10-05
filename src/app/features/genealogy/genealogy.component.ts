import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { AuthService } from '@core/services/auth.service';
import { GenealogyService } from '@core/services/genealogy.service';
import { Store } from '@ngrx/store';
import { getIcon } from '@shared/components/icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.sass'],
})
export class GenealogyComponent implements OnInit {
  genealogy$: Observable<GenealogyState>;
  iconButton: any;

  constructor(
    private store: Store<{ genealogyReducer: GenealogyState }>,
    public genealogyService: GenealogyService,
    private authService: AuthService,
    private scroller: ViewportScroller
  ) {
    this.genealogy$ = this.store.select('genealogyReducer');
    this.iconButton = getIcon('faUserPlus');
  }

  ngOnInit(): void {
    this.authService.fetchUserIncome();
    this.genealogyService.fetchGenealogy();
  }
  scrollToRoot() {
    let scroller: any = document.getElementById('scroller');
    scroller.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}
