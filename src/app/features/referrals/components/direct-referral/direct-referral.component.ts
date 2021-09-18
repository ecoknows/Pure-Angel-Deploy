import { Component, OnInit } from '@angular/core';
import { DirectSellingState } from '@core/redux/direct-selling/direct-selling.reducers';
import { DirectSellingService } from '@core/services/direct-selling.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IColumns } from '../table/table.component';

@Component({
  selector: 'app-direct-referral',
  templateUrl: './direct-referral.component.html',
  styleUrls: ['./direct-referral.component.sass'],
})
export class DirectReferralComponent implements OnInit {
  columns: IColumns = [
    {
      name: 'Name',
      width: 400,
    },
    {
      name: 'Age',
      width: 300,
    },
    {
      name: 'City',
      width: 300,
    },
  ];

  rows$: Observable<DirectSellingState>;

  constructor(
    private store: Store<{ directSellingReducer: DirectSellingState }>,
    private service: DirectSellingService
  ) {
    this.rows$ = store.select('directSellingReducer');
  }

  ngOnInit(): void {
    this.service.getTable();
  }
}
