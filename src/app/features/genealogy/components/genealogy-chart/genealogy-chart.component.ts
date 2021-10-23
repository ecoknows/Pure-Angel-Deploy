import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { UserState } from '@core/redux/user/user.reducer';

@Component({
  selector: 'genealogy-chart',
  templateUrl: './genealogy-chart.component.html',
  styleUrls: ['./genealogy-chart.component.sass'],
})
export class GenealogyChartComponent {
  @Input('user') user!: UserState | null;
  @Input('nodes') nodes!: Genealogy | undefined;
  @Input('hasParent') hasParent!: Genealogy;
  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';
  @Output('itemClick') itemClick = new EventEmitter<Genealogy>();
}
