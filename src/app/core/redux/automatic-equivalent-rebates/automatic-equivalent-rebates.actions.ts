import { createAction, props } from '@ngrx/store';
import { AutomaticEquivalentRebatesState } from './automatic-equivalent-rebates.reducers';

export const setAutomaticEquivalentRebates = createAction(
  '[Automatic Equivalent Rebates Component] Automatic Equivalent Rebates Fetch Item',
  props<{ list: AutomaticEquivalentRebatesState[] }>()
);
