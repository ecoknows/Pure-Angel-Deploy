import { createAction, props } from '@ngrx/store';
import { PurchaseState } from './purchase.reducers';

export const setPurchaseTable = createAction(
  '[Purchase Component] Set PurchaseTable',
  props<{ list: PurchaseState[] }>()
);

export const resetPurchaseTable = createAction(
  '[Purchase Component] Reset PurchaseTable'
);
