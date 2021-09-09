import { Component, Input, OnInit } from '@angular/core';
import { getIcon } from '../icons';

@Component({
  selector: 'app-card-total-number',
  templateUrl: './card-total-number.component.html',
  styleUrls: ['./card-total-number.component.sass'],
})
export class CardTotalNumberComponent implements OnInit {
  @Input('money') money: number = 0;
  @Input('label') label: string = '';
  @Input('icon') icon: any;

  constructor() {}

  ngOnInit(): void {
    this.icon = getIcon(this.icon);
  }
}
