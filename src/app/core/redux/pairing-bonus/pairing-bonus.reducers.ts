import { createReducer, on } from '@ngrx/store';
import { setPairingBonus } from './pairing-bonus.actions';

export interface PairingBonusState {
  user_id: string;
  first_name: string;
  last_name: string;
  address: string;

  left: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  right: {
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
  };

  income: string;
  createdAt: string;
}

export const PAIRING_BONUS_INITIAL_STATE: PairingBonusState[] = [];

const PAIRING_BONUS_REDUCER = createReducer(
  PAIRING_BONUS_INITIAL_STATE,
  on(setPairingBonus, (state, { list }) => [...list])
);

export function pairingBonusReducer(state: any, action: any) {
  return PAIRING_BONUS_REDUCER(state, action);
}
