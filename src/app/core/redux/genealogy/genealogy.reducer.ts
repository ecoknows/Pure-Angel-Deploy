import { createReducer, on } from '@ngrx/store';
import { setGenealogy, resetGenealogy, fetchRoot } from './genealogy.actions';
import { Genealogy } from './genealogy.model';
import { cloneDeep } from 'lodash';

export interface GenealogyState {
  genealogy?: Genealogy;
}

export const GENEALOGY_INITIAL_STATE: GenealogyState = {};

function Recursion(
  genealogy: Genealogy,
  position: string,
  root: Genealogy
): any {
  if (genealogy.left_branch) {
    let isLast = Recursion(genealogy.left_branch, 'left', root);
    if (isLast) {
      if (root.user_id == genealogy.left_branch?.user_id) {
        genealogy.left_branch = root;
      }
    }
  } else if (position == 'left') {
    return true;
  }

  if (genealogy.right_branch) {
    let isLast = Recursion(genealogy.right_branch, 'right', root);
    if (isLast) {
      if (root.user_id == genealogy.right_branch?.user_id) {
        genealogy.right_branch = root;
      }
    }
  } else if (position == 'right') {
    return true;
  }

  return false;
}

const GENEALOGY_REDUCER = createReducer(
  GENEALOGY_INITIAL_STATE,
  on(fetchRoot, (state, { root }) => {
    let _genealogy: any = cloneDeep({ ...state.genealogy });

    if (root) {
      Recursion(_genealogy, 'root', root);
    }

    return {
      ...state,
      genealogy: _genealogy,
    };
  }),
  on(setGenealogy, (state, { genealogy }) => {
    return {
      ...state,
      genealogy,
    };
  }),
  on(resetGenealogy, (state) => ({ ...state, genealogy: {} }))
);

export function genealogyReducer(state: any, action: any) {
  return GENEALOGY_REDUCER(state, action);
}
