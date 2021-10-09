import { createAction, props } from '@ngrx/store';
import { MemberVerificationState } from './member-verification.reducers';

export const setMemberVerificationTable = createAction(
  '[Member Verification Component] Set MemberVerificationTable',
  props<{ list: MemberVerificationState[] }>()
);

export const resetMemberVerificationTable = createAction(
  '[Member Verification Component] Reset MemberVerificationTable'
);
