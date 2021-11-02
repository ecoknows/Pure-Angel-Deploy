import { createReducer, on } from '@ngrx/store';
import { setSearchedAccountNumber } from './create-new-pin.actions';

export interface CreateNewPinState {
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  ending_pin?: number;
  number_of_pin?: number;

  is_mega_center?: boolean;
  is_stockist?: boolean;
  is_admin?: boolean;
}

export const CREATE_NEW_PIN_INITIAL_STATE: CreateNewPinState = {};

const CREATE_NEW_PIN_REDUCER = createReducer(
  CREATE_NEW_PIN_INITIAL_STATE,
  on(setSearchedAccountNumber, (state, { user }) => ({ ...state, ...user }))
);

export function createNewPinReducer(state: any, action: any) {
  return CREATE_NEW_PIN_REDUCER(state, action);
}
