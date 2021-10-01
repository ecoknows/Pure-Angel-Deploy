import { createReducer, on } from '@ngrx/store';
import {
  setVerificationTable,
  resetVerificationTable,
} from './verification.actions';

export interface VerificationState {
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

export const VERIFICATION_INITIAL_STATE: VerificationState[] = [];

const VERIFICATION_REDUCER = createReducer(
  VERIFICATION_INITIAL_STATE,
  on(setVerificationTable, (state, { list }) => [...list]),
  on(resetVerificationTable, (state) => [])
);

export function verificationReducer(state: any, action: any) {
  return VERIFICATION_REDUCER(state, action);
}
