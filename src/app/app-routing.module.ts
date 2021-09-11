import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  PageNotFoundComponent,
  ReferralsComponent,
} from '@shared/routes';
import { GenealogyComponent } from '@shared/routes/genealogy/genealogy.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'genealogy',
    component: GenealogyComponent,
  },
  {
    path: 'referrals',
    component: ReferralsComponent,
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
