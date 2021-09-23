import { createAction, props } from '@ngrx/store';
import { DirectReferral } from './direct-referral.model';

export const fetchDirectReferral = createAction(
  '[Direct Selling Component] Fetch Item',
  props<{ list: DirectReferral[] }>()
);
