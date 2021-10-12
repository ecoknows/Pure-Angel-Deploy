import { createReducer, on } from '@ngrx/store';
import { setUserPurchaseItem } from './user-purchase.actions';

export interface UserPurchaseState {
  user_id: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;

  user_that_invite: {
    user_id: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    address: string;
  };

  quantity: number;
  value: number;
  approved_date: string;
  approved: boolean;
  created_at: string;
}

export const USER_PURCHASE_INITIAL_STATE: UserPurchaseState[] = [];

const USER_PURCHASE_REDUCER = createReducer(
  USER_PURCHASE_INITIAL_STATE,
  on(setUserPurchaseItem, (state, { list }) => [...list])
);

export function userPurchaseReducer(state: any, action: any) {
  return USER_PURCHASE_REDUCER(state, action);
}
