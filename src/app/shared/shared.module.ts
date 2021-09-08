import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  PageNotFoundComponent,
  ReferralsComponent,
} from '@shared/routes';

import {
  SideBarComponent,
  LineChartComponent,
  CardTotalNumberComponent,
} from '@shared/components';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SideBarComponent,
    LineChartComponent,
    CardTotalNumberComponent,
    LoginComponent,
    DashboardComponent,
    NotificationsComponent,
    ReferralsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [
    SideBarComponent,
    LineChartComponent,
    CardTotalNumberComponent,
    LoginComponent,
    DashboardComponent,
    NotificationsComponent,
    ReferralsComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
