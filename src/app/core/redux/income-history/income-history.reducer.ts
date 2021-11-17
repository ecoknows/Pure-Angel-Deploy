import { createReducer, on } from '@ngrx/store';
import {
  setListIncomeHistory,
  resetListIncomeHistory,
} from './income-history.actions';

export interface IncomeHistoryState {
  account_number?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;

  buyer?: {
    account_number?: string;
    user_id?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
  };

  user: {
    // Direct Referral
    account_number: string;
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  new_member?: {
    account_number?: string;
    user_id?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
  };

  package?: string;
  quantity?: number;
  value?: number;
  income?: number;

  createdAt?: string;
}

export const INCOME_HISTORY_INITIAL_STATE: IncomeHistoryState[] = [];

const INCOME_HISTORY_REDUCER = createReducer(
  INCOME_HISTORY_INITIAL_STATE,
  on(setListIncomeHistory, (state, { list }) => list),
  on(resetListIncomeHistory, (state) => [])
);

export function incomeHistoryReducer(state: any, action: any) {
  return INCOME_HISTORY_REDUCER(state, action);
}
