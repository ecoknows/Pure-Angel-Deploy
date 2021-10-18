import { Component, Input } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { GenealogyService } from '@core/services/genealogy.service';

@Component({
  selector: 'genealogy-add',
  templateUrl: './genealogy-add.component.html',
  styleUrls: ['./genealogy-add.component.sass'],
})
export class GenealogyAddComponent {
  @Input('node') node!: Genealogy | undefined;
  @Input('position') position: 'left' | 'right' = 'left';

  constructor(private genealogyService: GenealogyService) {}

  addDirectRefferal() {
    if (this.node)
      this.genealogyService.fetchLeaves(this.node.user_id, this.position);
  }
}
