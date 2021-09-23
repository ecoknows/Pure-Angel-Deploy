import { createReducer, on } from '@ngrx/store';
import { fetchDirectReferral } from './direct-referral.actions';
import { DirectReferral } from './direct-referral.model';

export interface DirectReferralState {
  list: DirectReferral[];
}

export const DIRECT_REFERRAL_INITIAL_STATE: DirectReferralState = {
  list: [],
};

const DIRECT_REFERRAL_REDUCER = createReducer(
  DIRECT_REFERRAL_INITIAL_STATE,
  on(fetchDirectReferral, (state, { list }) => ({ ...state, list: list }))
);

export function directReferralReducer(state: any, action: any) {
  return DIRECT_REFERRAL_REDUCER(state, action);
}
