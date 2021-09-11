import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { INode } from '../node';

@Component({
  selector: 'genealogy-designer',
  templateUrl: './genealogy-designer.component.html',
  styleUrls: ['./genealogy-designer.component.sass'],
})
export class GenealogyDesignerComponent {
  @Input('node') node!: INode;
  @Input('hasParent') hasParent: boolean = false;
  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';

  @Output('itemClick') itemClick = new EventEmitter<INode>();

  @HostBinding('style.flex-direction')
  get hostClass() {
    return this.direction === 'vertical' ? 'column' : '';
  }
}
