import { createReducer, on } from '@ngrx/store';
import {
  resetUserCashoutsTable,
  setUserCashoutsTable,
} from './user-cashouts.actions';

export interface UserCashoutsState {
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;

  cashout: number;
  approved: boolean;
  created_at: string;
}

export const USER_CASHOUTS_INITIAL_STATE: UserCashoutsState[] = [];

const USER_CASHOUTS_REDUCER = createReducer(
  USER_CASHOUTS_INITIAL_STATE,
  on(setUserCashoutsTable, (state, { list }) => [...list]),
  on(resetUserCashoutsTable, (state) => [])
);

export function userCashoutsReducer(state: any, action: any) {
  return USER_CASHOUTS_REDUCER(state, action);
}
