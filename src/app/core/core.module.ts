import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReduxModule } from './redux/redux.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ReduxModule],
})
export class CoreModule {}
