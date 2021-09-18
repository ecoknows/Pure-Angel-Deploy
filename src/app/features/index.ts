import { DashboardComponent } from './dashboard/dashboard.component';
import { GenealogyComponent } from './genealogy/genealogy.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReferralsComponent } from './referrals/referrals.component';

export const components: any[] = [
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  ReferralsComponent,
  GenealogyComponent,
];

export * from './dashboard/dashboard.component';
export * from './login/login.component';
export * from './notifications/notifications.component';
export * from './referrals/referrals.component';
export * from './genealogy/genealogy.component';
