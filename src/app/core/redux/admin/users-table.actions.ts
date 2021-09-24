import { createAction, props } from '@ngrx/store';
import { UsersTableState } from './users-table.reducers';

export const setUsersTable = createAction(
  '[Users Table Component] Set UsersTable',
  props<{ list: UsersTableState[] }>()
);

export const resetUsersTable = createAction(
  '[Users Table Component] Reset UsersTable'
);
