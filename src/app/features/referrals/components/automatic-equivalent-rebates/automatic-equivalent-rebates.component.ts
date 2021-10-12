import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AutomaticEquivalentRebatesState } from '@core/redux/automatic-equivalent-rebates/automatic-equivalent-rebates.reducers';
import { AutomaticEquivalentRebatesService } from '@core/services/automatic-equivalent-rebates.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-automatic-equivalent-rebates',
  templateUrl: './automatic-equivalent-rebates.component.html',
  styleUrls: ['./automatic-equivalent-rebates.component.sass'],
})
export class AutomaticEquivalentRebatesComponent implements OnInit {
  @Input('rows') rows: AutomaticEquivalentRebatesState[] | null = [];

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(private aerService: AutomaticEquivalentRebatesService) {}

  ngOnInit(): void {
    this.aerService.fetchAER();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    this.rows = this.aerService.cache?.filter(function (d) {
      return d.user.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.table.offset = 0;
  }
}
