import { createReducer, on } from '@ngrx/store';
import {
  setAuthenticationTable,
  resetAuthenticationTable,
} from './authentication.actions';

export interface AuthenticationState {
  _id?: string;
  first_name?: string;
  last_name?: string;

  secret_code?: string;

  address?: string;
  birthdate?: string;

  contact_number?: string;
  is_stockist?: boolean;
  is_admin?: boolean;
  is_mega_center?: boolean;
  is_owner?: boolean;
}

export const AUTHENTICATION_INITIAL_STATE: AuthenticationState[] = [];

const AUTHENTICATION_REDUCER = createReducer(
  AUTHENTICATION_INITIAL_STATE,
  on(setAuthenticationTable, (state, { list }) => [...list]),
  on(resetAuthenticationTable, (state) => [])
);

export function authenticationReducer(state: any, action: any) {
  return AUTHENTICATION_REDUCER(state, action);
}
