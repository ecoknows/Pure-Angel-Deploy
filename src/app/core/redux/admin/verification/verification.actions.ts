import { createAction, props } from '@ngrx/store';
import { VerificationState } from './verification.reducers';

export const setVerificationTable = createAction(
  '[Verification Component] Set VerificationTable',
  props<{ list: VerificationState[] }>()
);

export const resetVerificationTable = createAction(
  '[Verification Component] Reset VerificationTable'
);
