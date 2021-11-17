import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { genealogyReducer } from './genealogy/genealogy.reducer';
import {
  searchAccountReducer,
  searchGenealogyReducer,
  searchReferralAccountReducer,
  searchPlaceUnderAccountReducer,
  searchMegaCenterAccountReducer,
} from './search-account/search-account.reducers';
import { incomeHistoryReducer } from './income-history/income-history.reducer';

const reducer: object = {
  genealogyReducer: genealogyReducer,
  userReducer: userReducer,
  searchAccountReducer: searchAccountReducer,
  searchReferralAccountReducer: searchReferralAccountReducer,
  searchMegaCenterAccountReducer: searchMegaCenterAccountReducer,
  searchPlaceUnderAccountReducer: searchPlaceUnderAccountReducer,
  searchGenealogyReducer: searchGenealogyReducer,
  incomeHistoryReducer: incomeHistoryReducer,
};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
