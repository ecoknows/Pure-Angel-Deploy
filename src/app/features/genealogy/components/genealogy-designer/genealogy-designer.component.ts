import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { UserState } from '@core/redux/user/user.reducer';
@Component({
  selector: 'genealogy-designer',
  templateUrl: './genealogy-designer.component.html',
  styleUrls: ['./genealogy-designer.component.sass'],
})
export class GenealogyDesignerComponent {
  @Input('user') user!: UserState | null;
  @Input('node') node!: Genealogy | undefined;
  @Input('hasParent') hasParent: boolean = false;
  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';
  @Input('root') root = false;

  @Output('itemClick') itemClick = new EventEmitter<Genealogy>();

  @HostBinding('style.flex-direction')
  get hostClass() {
    return this.direction === 'vertical' ? 'column' : '';
  }
}
