import { createReducer, on } from '@ngrx/store';
import {
  resetMemberVerificationTable,
  setMemberVerificationTable,
} from './member-verification.actions';

export interface MemberVerificationState {
  first_name?: string;
  last_name?: string;
  address?: string;
  birthdate?: string;
  user_id?: string;
  verified?: boolean;

  secret_code?: string;

  direct_referral?: number;
  indirect_referral?: number;
  pairing_bonus?: number;
  automatic_equivalent_rebates?: number;
}

export const MEMBER_VERIFICATION_INITIAL_STATE: MemberVerificationState[] = [];

const MEMBER_VERIFICATION_REDUCER = createReducer(
  MEMBER_VERIFICATION_INITIAL_STATE,
  on(setMemberVerificationTable, (state, { list }) => [...list]),
  on(resetMemberVerificationTable, (state) => [])
);

export function memberVerificationReducer(state: any, action: any) {
  return MEMBER_VERIFICATION_REDUCER(state, action);
}
