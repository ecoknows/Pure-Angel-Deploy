import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { LoginGuardService } from '@core/guards/login-guard.service';
import { AuthService } from '@core/services/auth.service';
import { MegaStockAdminGuardService } from '@core/services/mega-stock-admin-guard.service';
import { AdminComponent } from '@features/admin/admin.component';
import { CreateNewPinComponent } from '@features/admin/components/create-new-pin/create-new-pin.component';
import { UpgradeAccountComponent } from '@features/admin/components/upgrade-account/upgrade-account.component';
import { AdminGuardService } from '@features/admin/services/admin-guard.service';
import { MegaCenterComponent } from '@features/mega-center/mega-center.component';
import { MegaCenterGuardService } from '@features/mega-center/services/mega-center-guard.service';
import { NewMemberComponent } from '@features/new-member/new-member.component';
import { NewOrderComponent } from '@features/new-order/new-order.component';
import { StockInventoryComponent } from '@features/stock-inventory/stock-inventory.component';

import {
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  ReferralsComponent,
  GenealogyComponent,
  RegistrationComponent,
  SettingComponent,
} from './features';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'genealogy',
    component: GenealogyComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'notifications',
  //   component: NotificationsComponent,
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'referrals',
  //   component: ReferralsComponent,
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/create-new-pin',
    component: CreateNewPinComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/upgrade-account',
    component: UpgradeAccountComponent,
    canActivate: [AdminGuardService],
  },

  {
    path: 'new-member',
    component: NewMemberComponent,
    canActivate: [MegaStockAdminGuardService],
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    canActivate: [MegaStockAdminGuardService],
  },
  {
    path: 'stock-inventory',
    component: StockInventoryComponent,
    canActivate: [MegaStockAdminGuardService],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
