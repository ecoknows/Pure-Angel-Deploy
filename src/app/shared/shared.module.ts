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
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from './components/input/input.component';
import { DialogComponent } from './components/dialog/dialog.component';

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
    InputComponent,
    DialogComponent,
  ],
  imports: [
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxDatatableModule,

    MatTabsModule,
    MatInputModule,
    MatDialogModule,
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
    TableComponent,
    ButtonComponent,
    InputComponent,
  ],
})
export class SharedModule {}
