import { Component, OnInit } from '@angular/core';
import { GenealogyState } from '@core/redux/genealogy/genealogy.reducer';
import { GenealogyService } from '@core/services/genealogy.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.sass'],
})
export class GenealogyComponent implements OnInit {
  genealogy$: Observable<GenealogyState>;

  constructor(
    private store: Store<{ genealogyReducer: GenealogyState }>,
    private service: GenealogyService
  ) {
    this.genealogy$ = this.store.select('genealogyReducer');
  }

  ngOnInit(): void {
    this.service.fetchGenealogy();
  }
}
