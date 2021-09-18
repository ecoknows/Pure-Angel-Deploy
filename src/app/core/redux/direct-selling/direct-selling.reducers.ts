import { createReducer, on } from '@ngrx/store';
import { fetchItem } from './direct-selling.actions';
import { DirectSelling } from './direct-selling.model';

export interface DirectSellingState {
  list: DirectSelling[];
}

export const DIRECT_SELLING_INITIAL_STATE: DirectSellingState = {
  list: [],
};

const DIRECT_SELLING_REDUCER = createReducer(
  DIRECT_SELLING_INITIAL_STATE,
  on(fetchItem, (state, { list }) => ({ ...state, list: list }))
);

export function directSellingReducer(state: any, action: any) {
  return DIRECT_SELLING_REDUCER(state, action);
}
