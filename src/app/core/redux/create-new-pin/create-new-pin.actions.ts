import { createAction, props } from '@ngrx/store';
import { CreateNewPinState } from './create-new-pin.reducers';

export const setSearchedAccountNumber = createAction(
  '[Create New Pin Component] Set CreateNewPin',
  props<{ user: CreateNewPinState }>()
);
