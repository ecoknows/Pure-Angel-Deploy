import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { UserState } from '@core/redux/user/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  constructor(private store: Store<{ userReducer: UserState }>) {
    this.user$ = this.store.select('userReducer');
  }
}
