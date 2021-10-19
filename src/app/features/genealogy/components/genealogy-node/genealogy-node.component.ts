import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { GenealogyService } from '@core/services/genealogy.service';
@Component({
  selector: 'genealogy-node',
  templateUrl: './genealogy-node.component.html',
  styleUrls: ['./genealogy-node.component.sass'],
})
export class GenealogyNodeComponent {
  @Input('root') root = false;
  @Input('node') node!: Genealogy;

  @Input('hasParent') hasParent = false;

  @Input('direction') direction: 'vertical' | 'horizontal' = 'vertical';

  @Output('itemClick') itemClick = new EventEmitter<Genealogy>();

  user$: Observable<UserState>;
  faArrowCircleDown = faArrowCircleDown;

  constructor(
    private store: Store<{ userReducer: UserState }>,
    private genealogyService: GenealogyService
  ) {
    this.user$ = this.store.select('userReducer');
  }

  last_initial(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value.charAt(0);
  }

  fetchDownward() {
    if (this.node) this.genealogyService.fetchLeaves(this.node.user_id);
  }

  changeRoot() {
    if (this.node) this.genealogyService.viewChild(this.node.user_id);
  }
}
