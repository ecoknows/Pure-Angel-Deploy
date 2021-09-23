import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { getIcon } from '../icons';

export type IRows = {
  name: string;
  age: number;
  city: string;
  income: number;
}[];

export type IColumns = {
  name: string;
  width: number;
}[];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  @Input('columns') columns!: IColumns;
  @Input('rows') rows: any;
  @Input('table-title') table_title!: string;
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  verifiedIcon: any;
  cache: IRows = [];

  constructor(public dialog: MatDialog) {
    this.verifiedIcon = getIcon('faUserCheck');
  }

  ngOnInit(): void {
    // this.cache = [...this.rows];
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.cache.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  openDialog() {
    this.dialog.open(CreateDialogComponent, {});
  }
}
