import { createAction, props } from '@ngrx/store';
import { Genealogy } from '../genealogy/genealogy.model';
import { UserState } from '../user/user.reducer';

export const setSearchAccount = createAction(
  '[Search Account] Set Account',
  props<{ user: UserState }>()
);
export const resetSearchAccount = createAction('[Reset Account] Reset Account');

export const setSearchGenealogy = createAction(
  '[Search Account] Set Genealogy',
  props<{ genealogy: Genealogy }>()
);
export const resetSearchGenealogy = createAction(
  '[Reset Genalogy] Reset Genealogy'
);

export const setSearchReferralAccount = createAction(
  '[Search Referral Account] Set Account',
  props<{ user: UserState }>()
);
export const resetSearchReferralAccount = createAction(
  '[Reset Referral Account] Reset Account'
);

export const setSearchPlaceUnderAccount = createAction(
  '[Search PlaceUnder Account] Set Account',
  props<{ user: UserState }>()
);
export const resetSearchPlaceUnderAccount = createAction(
  '[Reset PlaceUnder Account] Reset Account'
);
