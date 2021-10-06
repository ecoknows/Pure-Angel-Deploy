import { createAction, props } from '@ngrx/store';
import { UserCashoutsState } from './user-cashouts.reducers';

export const setUserCashoutsTable = createAction(
  '[User Cashouts Component] Set UserCashoutsTable',
  props<{ list: UserCashoutsState[] }>()
);

export const resetUserCashoutsTable = createAction(
  '[User Cashouts Component] Reset UserCashoutsTable'
);
