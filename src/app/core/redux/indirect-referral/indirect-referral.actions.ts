import { createAction, props } from '@ngrx/store';
import { IndirectReferral } from './indirect-referral.model';

export const fetchIndirectReferral = createAction(
  '[Direct Selling Component] Fetch Item',
  props<{ list: IndirectReferral[] }>()
);
