import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { LoginGuardService } from '@core/guards/login-guard.service';

import {
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  ReferralsComponent,
  GenealogyComponent,
} from './features';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService] ,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService] ,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuardService] ,
  },
  {
    path: 'genealogy',
    component: GenealogyComponent,
    canActivate: [AuthGuardService] ,
  },
  {
    path: 'referrals',
    component: ReferralsComponent,
    canActivate: [AuthGuardService] ,
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
