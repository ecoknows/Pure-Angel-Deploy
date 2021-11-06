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
import { HistoryTimelineComponent } from './dashboard/components/history-timeline/history-timeline.component';
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
import { MegaCenterComponent } from './mega-center/mega-center.component';
import { MemberVerificationComponent } from './mega-center/components/member-verification/member-verification.component';
import { ApproveCashoutDialogComponent } from './admin/approve-cashout-dialog/approve-cashout-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PurchaseComponent } from './referrals/components/purchase/purchase.component';
import { PurchaseVerificationComponent } from './admin/components/purchase-verification/purchase-verification.component';
import { PurchaseDialogComponent } from './referrals/components/purchase/components/purchase-dialog/purchase-dialog.component';
import { PurchaseVerificationDialogComponent } from './admin/purchase-verification-dialog/purchase-verification-dialog.component';
import { AutomaticEquivalentRebatesComponent } from './referrals/components/automatic-equivalent-rebates/automatic-equivalent-rebates.component';
import { SupplyDialogComponent } from './dashboard/components/supply-dialog/supply-dialog.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { MatListModule } from '@angular/material/list';
import { CreateNewPinComponent } from './admin/components/create-new-pin/create-new-pin.component';
import { MatRippleModule } from '@angular/material/core';
import { StockInventoryComponent } from './stock-inventory/stock-inventory.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UpgradeAccountComponent } from './admin/components/upgrade-account/upgrade-account.component';

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
    HistoryTimelineComponent,
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
    MegaCenterComponent,
    MemberVerificationComponent,
    ApproveCashoutDialogComponent,
    PurchaseComponent,
    PurchaseVerificationComponent,
    PurchaseDialogComponent,
    PurchaseVerificationDialogComponent,
    AutomaticEquivalentRebatesComponent,
    SupplyDialogComponent,
    NewMemberComponent,
    NewOrderComponent,
    CreateNewPinComponent,
    StockInventoryComponent,
    UpgradeAccountComponent,
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
    MatListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FontAwesomeModule,
    NgxDatatableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatRippleModule,
    MatButtonToggleModule,
  ],
})
export class FeaturesModule {}
