import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { genealogyReducer } from './genealogy/genealogy.reducer';
import {
  searchAccountReducer,
  searchGenealogyReducer,
} from './search-account/search-account.reducers';

const reducer: object = {
  genealogyReducer: genealogyReducer,
  userReducer: userReducer,
  searchAccountReducer: searchAccountReducer,
  searchGenealogyReducer: searchGenealogyReducer,
};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
