import { createReducer, on } from '@ngrx/store';
import { setPairingBonus } from './pairing-bonus.actions';

export interface PairingBonusState {
  pairing_bonus_info: {
    root_id: string;
    root_first_name: string;
    root_last_name: string;

    right_id: string;
    right_first_name: string;
    right_last_name: string;

    left_id: string;
    left_first_name: string;
    left_last_name: string;
  };

  income_pairing_bonus: string;
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
