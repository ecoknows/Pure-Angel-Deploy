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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { MatTabsModule } from '@angular/material/tabs';

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
    TableComponent,
    ButtonComponent,
  ],
  imports: [
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxDatatableModule,
    MatTabsModule,
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
