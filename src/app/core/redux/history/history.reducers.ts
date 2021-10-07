import { createReducer, on } from '@ngrx/store';
import { resetHistoryTimeline, setHistoryTimeline } from './history.actions';

export interface HistoryState {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

export const HISTORY_INITIAL_STATE: HistoryState[] = [];

const HISTORY_REDUCER = createReducer(
  HISTORY_INITIAL_STATE,
  on(setHistoryTimeline, (state, { list }) => [...list]),
  on(resetHistoryTimeline, (state) => [])
);

export function historyReducer(state: any, action: any) {
  return HISTORY_REDUCER(state, action);
}
