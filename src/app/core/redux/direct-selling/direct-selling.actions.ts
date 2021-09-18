import { createAction, props } from '@ngrx/store';
import { DirectSelling } from './direct-selling.model';

export const fetchItem = createAction(
  '[Direct Selling Component] Fetch Item',
  props<{ list: DirectSelling[] }>()
);
