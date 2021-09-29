import { createReducer, on } from '@ngrx/store';
import { fetchDirectReferral } from './direct-referral.actions';
export interface DirectReferralState {
  user_id: string;
  first_name: string;
  last_name: string;
  address: string;

  root_user: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  income: number;
}

export const DIRECT_REFERRAL_INITIAL_STATE: DirectReferralState[] = [];

const DIRECT_REFERRAL_REDUCER = createReducer(
  DIRECT_REFERRAL_INITIAL_STATE,
  on(fetchDirectReferral, (state, { list }) => [...list])
);

export function directReferralReducer(state: any, action: any) {
  return DIRECT_REFERRAL_REDUCER(state, action);
}
