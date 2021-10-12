import { createReducer, on } from '@ngrx/store';
import { resetPurchaseTable, setPurchaseTable } from './purchase.actions';

export interface PurchaseState {
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

export const PURCHASE_INITIAL_STATE: PurchaseState[] = [];

const PURCHASE_REDUCER = createReducer(
  PURCHASE_INITIAL_STATE,
  on(setPurchaseTable, (state, { list }) => [...list]),
  on(resetPurchaseTable, (state) => [])
);

export function purchaseReducer(state: any, action: any) {
  return PURCHASE_REDUCER(state, action);
}
