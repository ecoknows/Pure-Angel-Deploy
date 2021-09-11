import { Component, Input, Output, EventEmitter } from '@angular/core';
import { INode } from '../node';

@Component({
  selector: 'genealogy-node',
  templateUrl: './genealogy-node.component.html',
  styleUrls: ['./genealogy-node.component.sass'],
})
export class GenealogyNodeComponent {
  @Input('node') node!: INode;

  @Input('hasParent') hasParent = false;

  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';

  @Output('itemClick') itemClick = new EventEmitter<INode>();
}
