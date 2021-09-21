import { Component, Input } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';

@Component({
  selector: 'genealogy-add',
  templateUrl: './genealogy-add.component.html',
  styleUrls: ['./genealogy-add.component.sass'],
})
export class GenealogyAddComponent {
  @Input('node') node!: Genealogy | undefined;
  @Input('position') position: 'left' | 'middle' | 'right' = 'middle';

  constructor() {}
}
