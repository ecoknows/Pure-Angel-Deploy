import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReduxModule } from './redux/redux.module';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [PageNotFoundComponent, SideBarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReduxModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [PageNotFoundComponent, SideBarComponent],
})
export class CoreModule {}
