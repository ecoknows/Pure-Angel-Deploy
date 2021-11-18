import { createAction, props } from '@ngrx/store';
import { PinHistoryState } from './pin-history.reducer';

export const setListPinHistory = createAction(
  'Set Pin History',
  props<{ list: PinHistoryState[] }>()
);

export const resetListPinHistory = createAction('Reset List Pin History');
