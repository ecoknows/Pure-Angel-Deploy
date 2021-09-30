import { createReducer, on } from '@ngrx/store';
import { setUsersTable, resetUsersTable } from './users-table.actions';

export interface UsersTableState {
  first_name?: string;
  last_name?: string;
  address?: string;
  birthdate?: string;
  user_id?: string;
  verified?: boolean;

  secret_code?: string;

  direct_referral?: number;
  indirect_referral?: number;
  pairing_bonus?: number;
  automatic_equivalent_rebates?: number;
}

export const USERS_TABLE_INITIAL_STATE: UsersTableState[] = [];

const USERS_TABLE_REDUCER = createReducer(
  USERS_TABLE_INITIAL_STATE,
  on(setUsersTable, (state, { list }) => [...list]),
  on(resetUsersTable, (state) => [])
);

export function usersTableReducer(state: any, action: any) {
  return USERS_TABLE_REDUCER(state, action);
}
