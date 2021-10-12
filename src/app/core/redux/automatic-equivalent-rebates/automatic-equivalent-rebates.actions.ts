import { createAction, props } from '@ngrx/store';
import { AutomaticEquivalentRebatesState } from './automatic-equivalent-rebates.reducers';

export const setAutomaticEquivalentRebates = createAction(
  '[Direct Referral Component] Fetch Item',
  props<{ list: AutomaticEquivalentRebatesState[] }>()
);
