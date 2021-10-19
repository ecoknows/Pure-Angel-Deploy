import { createAction, props } from '@ngrx/store';
import { Genealogy } from './genealogy.model';

export const setGenealogy = createAction(
  '[Genealogy Component] Set Item',
  props<{ genealogy: Genealogy }>()
);

export const fetchRoot = createAction(
  '[Genealogy Component] fetchRoot',
  props<{ root: Genealogy }>()
);

export const resetGenealogy = createAction('[Genealogy Component] Reset Item');
