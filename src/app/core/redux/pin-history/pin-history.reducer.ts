import { createReducer, on } from '@ngrx/store';
import { setListPinHistory, resetListPinHistory } from './pin-history.actions';

export interface PinHistoryState {
  account_number?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;

  recipient?: {
    account_number?: string;
    user_id?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
  };

  quantity?: number;
  soap_quantity?: number;
  coffee_quantity?: number;

  createdAt?: string;
}

export const PIN_HISTORY_INITIAL_STATE: PinHistoryState[] = [];

const PIN_HISTORY_REDUCER = createReducer(
  PIN_HISTORY_INITIAL_STATE,
  on(setListPinHistory, (state, { list }) => list),
  on(resetListPinHistory, (state) => [])
);

export function pinHistoryReducer(state: any, action: any) {
  return PIN_HISTORY_REDUCER(state, action);
}
