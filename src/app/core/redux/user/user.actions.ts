import { createAction, props } from '@ngrx/store';
import { UserState } from './user.reducer';

export const setUserData = createAction(
  'Set User Data',
  props<{ user: UserState }>()
);

export const resetUserData = createAction('Reset User Data');
