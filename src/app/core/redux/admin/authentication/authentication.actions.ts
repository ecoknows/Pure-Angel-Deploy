import { createAction, props } from '@ngrx/store';
import { AuthenticationState } from './authentications.reducers';

export const setAuthenticationTable = createAction(
  '[Authentication Component] Set AuthenticationTable',
  props<{ list: AuthenticationState[] }>()
);

export const resetAuthenticationTable = createAction(
  '[Authentication Component] Reset AuthenticationTable'
);
