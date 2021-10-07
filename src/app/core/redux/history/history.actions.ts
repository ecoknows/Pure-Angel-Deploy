import { createAction, props } from '@ngrx/store';
import { HistoryState } from './history.reducers';

export const setHistoryTimeline = createAction(
  '[History Component] Set HistoryTimeline',
  props<{ list: HistoryState[] }>()
);

export const resetHistoryTimeline = createAction(
  '[History Component] Reset HistoryTimeline'
);
