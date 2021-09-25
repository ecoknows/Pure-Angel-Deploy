import { createAction, props } from '@ngrx/store';
import { DirectReferralState } from './direct-referral.reducers';

export const fetchDirectReferral = createAction(
  '[Direct Referral Component] Fetch Item',
  props<{ list: DirectReferralState[] }>()
);
