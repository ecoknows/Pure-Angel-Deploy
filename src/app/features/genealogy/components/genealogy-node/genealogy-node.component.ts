import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'genealogy-node',
  templateUrl: './genealogy-node.component.html',
  styleUrls: ['./genealogy-node.component.sass'],
})
export class GenealogyNodeComponent {
  @Input('node') node!: Genealogy;

  @Input('hasParent') hasParent = false;

  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';

  @Output('itemClick') itemClick = new EventEmitter<Genealogy>();

  constructor(public authService: AuthService) {}
}
