import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReferralsComponent } from './referrals/referrals.component';

export const components: any[] = [
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  PageNotFoundComponent,
  ReferralsComponent,
];

export * from './dashboard/dashboard.component';
export * from './login/login.component';
export * from './notifications/notifications.component';
export * from './page-not-found/page-not-found.component';
export * from './referrals/referrals.component';
