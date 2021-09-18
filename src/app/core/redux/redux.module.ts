import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { directSellingReducer } from './direct-selling/direct-selling.reducers';
import { genealogyReducer } from './genealogy/genealogy.reducer';

const reducer: object = {
  directSellingReducer: directSellingReducer,
  genealogyReducer: genealogyReducer,
  userReducer: userReducer,
};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
