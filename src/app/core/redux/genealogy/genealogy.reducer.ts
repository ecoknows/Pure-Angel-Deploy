import { createReducer, on } from '@ngrx/store';
import { setGenealogy, resetGenealogy } from './genealogy.actions';
import { Genealogy } from './genealogy.model';

export interface GenealogyState {
  genealogy: Genealogy;
}

export const GENEALOGY_INITIAL_STATE: GenealogyState = {
  genealogy: {},
};

const GENEALOGY_REDUCER = createReducer(
  GENEALOGY_INITIAL_STATE,
  on(setGenealogy, (state, { genealogy }) => ({
    genealogy: { ...genealogy },
  })),
  on(resetGenealogy, (state) => ({ ...state, genealogy: {} }))
);

export function genealogyReducer(state: any, action: any) {
  return GENEALOGY_REDUCER(state, action);
}
