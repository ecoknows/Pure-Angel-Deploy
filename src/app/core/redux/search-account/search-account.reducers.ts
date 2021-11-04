import { createReducer, on } from '@ngrx/store';
import { Genealogy } from '../genealogy/genealogy.model';
import { UserState } from '../user/user.reducer';
import {
  resetSearchGenealogy,
  setSearchGenealogy,
  setSearchAccount,
  resetSearchAccount,
} from './search-account.actions';

export const SEARCH_GENEALOGY_INITIAL_STATE: Genealogy = {};
export const SEARCH_ACCOUNT_INITIAL_STATE: UserState = {};

const SEARCH_GENEALOGY_REDUCER = createReducer(
  SEARCH_GENEALOGY_INITIAL_STATE,
  on(setSearchGenealogy, (state, { genealogy }) => genealogy),
  on(resetSearchGenealogy, (state) => ({}))
);

const SEARCH_ACCOUNT_REDUCER = createReducer(
  SEARCH_ACCOUNT_INITIAL_STATE,
  on(setSearchAccount, (state, { user }) => user),
  on(resetSearchAccount, (state) => ({}))
);

export function searchGenealogyReducer(state: any, action: any) {
  return SEARCH_GENEALOGY_REDUCER(state, action);
}

export function searchAccountReducer(state: any, action: any) {
  return SEARCH_ACCOUNT_REDUCER(state, action);
}
