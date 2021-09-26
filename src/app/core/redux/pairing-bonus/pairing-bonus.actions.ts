import { createAction, props } from '@ngrx/store';

import { PairingBonusState } from './pairing-bonus.reducers';

export const setPairingBonus = createAction(
  '[Pairing Bonus Component] Set Pairing Bonus',
  props<{ list: PairingBonusState[] }>()
);
