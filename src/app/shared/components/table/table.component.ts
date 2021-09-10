import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DialogComponent } from '../dialog/dialog.component';

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
  @Input('rows') rows!: IRows;
  @Input('button-icon') button_icon: string = 'faUsers';
  @Input('button-title') button_title: string = 'Button';
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  cache: IRows = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cache = [...this.rows];
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });
  }
}
