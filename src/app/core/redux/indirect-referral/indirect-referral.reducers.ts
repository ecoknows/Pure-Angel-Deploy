import { createReducer, on } from '@ngrx/store';
import { fetchIndirectReferral } from './indirect-referral.actions';
import { IndirectReferral } from './indirect-referral.model';

export interface IndirectReferralState {
  list: IndirectReferral[];
}

export const INDIRECT_REFERRAL_INITIAL_STATE: IndirectReferralState = {
  list: [],
};

const INDIRECT_REFERRAL_REDUCER = createReducer(
  INDIRECT_REFERRAL_INITIAL_STATE,
  on(fetchIndirectReferral, (state, { list }) => ({ ...state, list: list }))
);

export function indirectReferralReducer(state: any, action: any) {
  return INDIRECT_REFERRAL_REDUCER(state, action);
}
