import { DashboardComponent } from './dashboard/dashboard.component';
import { GenealogyComponent } from './genealogy/genealogy.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingComponent } from './setting/setting.component';

export const components: any[] = [
  DashboardComponent,
  LoginComponent,
  NotificationsComponent,
  ReferralsComponent,
  GenealogyComponent,
  RegistrationComponent,
];

export * from './dashboard/dashboard.component';
export * from './login/login.component';
export * from './notifications/notifications.component';
export * from './referrals/referrals.component';
export * from './genealogy/genealogy.component';
export * from './registration/registration.component';
export * from './setting/setting.component';
