import { createReducer, on } from '@ngrx/store';
import { setAutomaticEquivalentRebates } from './automatic-equivalent-rebates.actions';
export interface AutomaticEquivalentRebatesState {
  user_id: string;
  purchase_id: string;

  first_name: string;
  last_name: string;
  address: string;

  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  quantity: number;
  income: number;
  createdAt: string;
}

export const AUTOMATIC_EQUIVALENT_REBATES_INITIAL_STATE: AutomaticEquivalentRebatesState[] =
  [];

const AUTOMATIC_EQUIVALENT_REBATES_REDUCER = createReducer(
  AUTOMATIC_EQUIVALENT_REBATES_INITIAL_STATE,
  on(setAutomaticEquivalentRebates, (state, { list }) => [...list])
);

export function automaticEquivalentRebatesReducer(state: any, action: any) {
  return AUTOMATIC_EQUIVALENT_REBATES_REDUCER(state, action);
}
