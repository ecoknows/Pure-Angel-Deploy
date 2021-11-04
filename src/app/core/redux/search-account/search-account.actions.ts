import { createAction, props } from '@ngrx/store';
import { Genealogy } from '../genealogy/genealogy.model';
import { UserState } from '../user/user.reducer';

export const setSearchAccount = createAction(
  '[Search Account] Set Account',
  props<{ user: UserState }>()
);
export const resetSearchAccount = createAction(
  '[Search Account] Reset Account'
);

export const setSearchGenealogy = createAction(
  '[Search Account] Set Genealogy',
  props<{ genealogy: Genealogy }>()
);
export const resetSearchGenealogy = createAction(
  '[Search Account] Reset Genealogy'
);
