import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';
import {
  faDesktop,
  faBell,
  faUsers,
  faTree,
} from '@fortawesome/free-solid-svg-icons';
import { getIcon } from '@shared/components/icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent {
  menus = [
    {
      url: '',
      icon: faDesktop,
    },
    {
      url: 'genealogy',
      icon: faTree,
    },
    {
      url: 'referrals',
      icon: faUsers,
    },
    {
      url: 'notifications',
      icon: faBell,
    },
  ];

  userShield: any;

  constructor(public authService: AuthService) {
    this.userShield = getIcon('faUserShield');
  }

  logout() {
    this.authService.logout();
  }
}
