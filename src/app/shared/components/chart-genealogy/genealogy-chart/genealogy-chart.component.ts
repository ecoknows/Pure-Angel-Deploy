import { Component, Input, Output, EventEmitter } from '@angular/core';
import { INode } from '../node';

@Component({
  selector: 'genealogy-chart',
  templateUrl: './genealogy-chart.component.html',
  styleUrls: ['./genealogy-chart.component.sass'],
})
export class GenealogyChartComponent {
  @Input('nodes') nodes!: INode[];
  @Input('hasParent') hasParent!: INode[];
  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';
  @Output('itemClick') itemClick = new EventEmitter<INode>();
}
