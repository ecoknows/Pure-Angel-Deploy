import { createAction, props } from '@ngrx/store';
import { UserPurchaseState } from './user-purchase.reducers';

export const setUserPurchaseItem = createAction(
  '[User Purchase Component] Set User Purchase Item',
  props<{ list: UserPurchaseState[] }>()
);
