import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
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
    public genealogyService: GenealogyService
  ) {
    this.genealogy$ = this.store.select('genealogyReducer');
    this.iconButton = getIcon('faUserPlus');
  }

  ngOnInit(): void {
    this.genealogyService.fetchGenealogy();
  }
}
