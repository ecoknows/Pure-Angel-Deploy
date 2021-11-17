import { createAction, props } from '@ngrx/store';
import { IncomeHistoryState } from './income-history.reducer';

export const setListIncomeHistory = createAction(
  'Set List Of Income History',
  props<{ list: IncomeHistoryState[] }>()
);

export const resetListIncomeHistory = createAction(
  'Reset List Of Income History'
);
