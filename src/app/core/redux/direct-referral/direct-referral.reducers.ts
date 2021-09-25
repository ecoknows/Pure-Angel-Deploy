import { createReducer, on } from '@ngrx/store';
import { fetchDirectReferral } from './direct-referral.actions';
export interface DirectReferralState {
  first_name: string;
  last_name: string;
  address: string;
  birthdate: string;
  user_id: string;
  income: number;
  verified: boolean;
}

export const DIRECT_REFERRAL_INITIAL_STATE: DirectReferralState[] = [];

const DIRECT_REFERRAL_REDUCER = createReducer(
  DIRECT_REFERRAL_INITIAL_STATE,
  on(fetchDirectReferral, (state, { list }) => [...list])
);

export function directReferralReducer(state: any, action: any) {
  return DIRECT_REFERRAL_REDUCER(state, action);
}
