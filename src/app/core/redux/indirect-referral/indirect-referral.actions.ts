import { createAction, props } from '@ngrx/store';
import { IndirectReferralState } from './indirect-referral.reducers';

export const setIndirectReferral = createAction(
  '[Indirect Referral Component] Seet Inderect Referral',
  props<{ list: IndirectReferralState[] }>()
);
