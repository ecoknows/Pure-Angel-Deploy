import { createReducer, on } from '@ngrx/store';
import { resetCashoutsTable, setCashoutsTable } from './cashouts.actions';

export interface CashoutsState {
  user_id?: string;

  first_name?: string;
  last_name?: string;
  address?: string;
  contact_number?: string;

  remarks?: string;

  cashout?: number;
  approved?: boolean;
  created_at?: string;
}

export const CASHOUTS_INITIAL_STATE: CashoutsState[] = [];

const CASHOUTS_REDUCER = createReducer(
  CASHOUTS_INITIAL_STATE,
  on(setCashoutsTable, (state, { list }) => [...list]),
  on(resetCashoutsTable, (state) => [])
);

export function cashoutsReducer(state: any, action: any) {
  return CASHOUTS_REDUCER(state, action);
}
