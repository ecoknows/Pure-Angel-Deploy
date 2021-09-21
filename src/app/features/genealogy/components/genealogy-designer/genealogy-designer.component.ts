import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
@Component({
  selector: 'genealogy-designer',
  templateUrl: './genealogy-designer.component.html',
  styleUrls: ['./genealogy-designer.component.sass'],
})
export class GenealogyDesignerComponent {
  @Input('node') node!: Genealogy | undefined;
  @Input('hasParent') hasParent: boolean = false;
  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';

  @Output('itemClick') itemClick = new EventEmitter<Genealogy>();

  @HostBinding('style.flex-direction')
  get hostClass() {
    return this.direction === 'vertical' ? 'column' : '';
  }
}
