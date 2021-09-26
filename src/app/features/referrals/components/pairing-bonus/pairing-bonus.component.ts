import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PairingBonusState } from '@core/redux/pairing-bonus/pairing-bonus.reducers';
import { PairingBonusService } from '@core/services/pairing-bonus.service';
import { getIcon } from '@shared/components/icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-pairing-bonus',
  templateUrl: './pairing-bonus.component.html',
  styleUrls: ['./pairing-bonus.component.sass'],
})
export class PairingBonusComponent implements OnInit {
  @Input('rows') rows: PairingBonusState[] | null = [];
  verifiedIcon: any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private pairingBonusService: PairingBonusService) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    this.pairingBonusService.fetchPairingBonus();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.pairingBonusService.cache?.filter(function (d) {
      return (
        d.pairing_bonus_info.root_first_name.toLowerCase().indexOf(val) !==
          -1 || !val
      );
    });

    this.table.offset = 0;
  }
}
