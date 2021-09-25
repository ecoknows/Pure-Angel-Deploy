import { createReducer, on } from '@ngrx/store';
import { setIndirectReferral } from './indirect-referral.actions';

export interface IndirectReferralState {
  first_name: string;
  last_name: string;
  address: string;
  birthdate: string;
  user_id: string;
  income: number;
  verified: boolean;
}

export const INDIRECT_REFERRAL_INITIAL_STATE: IndirectReferralState[] = [];

const INDIRECT_REFERRAL_REDUCER = createReducer(
  INDIRECT_REFERRAL_INITIAL_STATE,
  on(setIndirectReferral, (state, { list }) => [...list])
);

export function indirectReferralReducer(state: any, action: any) {
  return INDIRECT_REFERRAL_REDUCER(state, action);
}
