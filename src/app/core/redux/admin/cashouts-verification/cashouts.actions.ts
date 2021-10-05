import { createAction, props } from '@ngrx/store';
import { CashoutsState } from './cashouts.reducers';

export const setCashoutsTable = createAction(
  '[Cashouts Component] Set CashoutsTable',
  props<{ list: CashoutsState[] }>()
);

export const resetCashoutsTable = createAction(
  '[Cashouts Component] Reset CashoutsTable'
);
