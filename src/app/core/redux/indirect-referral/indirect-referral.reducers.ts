import { createReducer, on } from '@ngrx/store';
import { setIndirectReferral } from './indirect-referral.actions';

export interface IndirectReferralState {
  first_name: string;
  last_name: string;
  address: string;

  user_that_invite: {
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

  pair: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  income: { type: Number; default: 0 };
}

export const INDIRECT_REFERRAL_INITIAL_STATE: IndirectReferralState[] = [];

const INDIRECT_REFERRAL_REDUCER = createReducer(
  INDIRECT_REFERRAL_INITIAL_STATE,
  on(setIndirectReferral, (state, { list }) => [...list])
);

export function indirectReferralReducer(state: any, action: any) {
  return INDIRECT_REFERRAL_REDUCER(state, action);
}
