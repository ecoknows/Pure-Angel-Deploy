import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';
import {
  faDesktop,
  faBell,
  faUsers,
  faTree,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { getIcon } from '@shared/components/icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent implements OnInit {
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
    {
      url: 'setting',
      icon: faCog,
    },
  ];

  userShield: any;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {
    this.userShield = getIcon('faUserShield');
  }

  ngOnInit(): void {}

  get checkIfAdmin() {
    const helper = new JwtHelperService();
    const token = this.authService.userToken;

    if (token) {
      const user = helper.decodeToken(token);
      if (user.is_admin) {
        return true;
      }
    }
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
