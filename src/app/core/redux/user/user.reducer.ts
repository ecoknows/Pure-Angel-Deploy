import { createReducer, on } from '@ngrx/store';
import { resetUserData, setUserData } from './user.actions';

export interface UserState {
  _id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  birthdate?: string;

  is_stockist?: boolean;
  is_admin?: boolean;
  is_ancestor?: boolean;

  overall_income?: number;
  direct_referral?: number;
  indirect_referral?: number;
  pairing_bonus?: number;
  automatic_equivalent_rebates?: number;
  direct_selling?: number;
}

export const USER_INITIAL_STATE: UserState = {};

const USER_REDUCER = createReducer(
  USER_INITIAL_STATE,
  on(setUserData, (state, { user }) => ({ ...state, ...user })),
  on(resetUserData, (state) => ({}))
);

export function userReducer(state: any, action: any) {
  return USER_REDUCER(state, action);
}
