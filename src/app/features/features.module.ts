import { NgModule } from '@angular/core';
import {
  DashboardComponent,
  GenealogyComponent,
  LoginComponent,
  NotificationsComponent,
  ReferralsComponent,
} from '.';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GenealogyChartComponent } from './genealogy/components/genealogy-chart/genealogy-chart.component';
import { GenealogyDesignerComponent } from './genealogy/components/genealogy-designer/genealogy-designer.component';
import { GenealogyNodeComponent } from './genealogy/components/genealogy-node/genealogy-node.component';
import { LineChartComponent } from './dashboard/components/line-chart/line-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { RegistrationComponent } from './registration/registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenealogyAddComponent } from './genealogy/components/genealogy-add/genealogy-add.component';
import { DirectReferralComponent } from './referrals/components/direct-referral/direct-referral.component';
import { IndirectReferralComponent } from './referrals/components/indirect-referral/indirect-referral.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminComponent } from './admin/admin.component';
import { VerificationComponent } from './admin/components/verification/verification.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PairingBonusComponent } from './referrals/components/pairing-bonus/pairing-bonus.component';
import { CashoutDialogComponent } from './dashboard/components/cashout-dialog/cashout-dialog.component';
import { SettingComponent } from './setting/setting.component';
import { AuthenticationComponent } from './admin/components/authentication/authentication.component';
import { MatSelectModule } from '@angular/material/select';
import { EditUserDialogComponent } from './admin/components/edit-user-dialog/edit-user-dialog.component';
import { FormDirective } from './setting/directives/form.directive';
import { CashoutsVerificationComponent } from './admin/components/cashouts-verification/cashouts-verification.component';
import { UserCashoutsComponent } from './referrals/components/user-cashouts/user-cashouts.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    NotificationsComponent,
    ReferralsComponent,
    GenealogyChartComponent,
    GenealogyDesignerComponent,
    GenealogyNodeComponent,
    GenealogyComponent,
    LineChartComponent,
    RegistrationComponent,
    GenealogyAddComponent,
    DirectReferralComponent,
    IndirectReferralComponent,
    PairingBonusComponent,
    AdminComponent,
    VerificationComponent,
    PairingBonusComponent,
    CashoutDialogComponent,
    SettingComponent,
    AuthenticationComponent,
    EditUserDialogComponent,
    FormDirective,
    CashoutsVerificationComponent,
    UserCashoutsComponent,
  ],
  imports: [
    NgxChartsModule,

    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FontAwesomeModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class FeaturesModule {}
