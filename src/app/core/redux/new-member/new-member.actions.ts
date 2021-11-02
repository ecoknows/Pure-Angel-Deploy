import { createAction, props } from '@ngrx/store';
import { Genealogy } from '../genealogy/genealogy.model';
export const setNewMember = createAction(
  '[New Member Component] Set New Member',
  props<{ genealogy: Genealogy }>()
);
export const resetNewMember = createAction(
  '[New Member Component] Reset Member'
);
