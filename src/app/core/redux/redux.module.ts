import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

const reducer: object = {};

@NgModule({
  declarations: [],
  imports: [StoreModule.forRoot(reducer)],
})
export class ReduxModule {}
