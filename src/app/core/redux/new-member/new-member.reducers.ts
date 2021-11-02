import { createReducer, on } from '@ngrx/store';
import { Genealogy } from '../genealogy/genealogy.model';
import { resetNewMember, setNewMember } from './new-member.actions';

export const NEW_MEMBER_INITIAL_STATE: Genealogy = {};

const NEW_MEMBER_REDUCER = createReducer(
  NEW_MEMBER_INITIAL_STATE,
  on(setNewMember, (state, { genealogy }) => genealogy),
  on(resetNewMember, (state) => ({}))
);

export function newMemberReducer(state: any, action: any) {
  return NEW_MEMBER_REDUCER(state, action);
}
