import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';
import {
  faDesktop,
  faBell,
  faUsers,
  faTree,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { getIcon } from '@shared/components/icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent implements OnInit {
  @Input('drawer') drawer: any;
  menus = [
    {
      url: '',
      name: 'Dashboard',
      icon: faDesktop,
    },
    {
      url: 'genealogy',
      name: 'Genealogy',
      icon: faTree,
    },
    {
      url: 'referrals',
      name: 'Referrals',
      icon: faUsers,
    },
    {
      url: 'notifications',
      name: 'Notifications',
      icon: faBell,
    },
    {
      url: 'setting',
      name: 'Setting',
      icon: faCog,
    },
  ];

  userShield: any;
  userCheck: any;
  logoutIcon = faSignOutAlt;

  constructor(
    private authService: AuthService,
    public sidebarService: SidebarService
  ) {
    this.userShield = getIcon('faUserShield');
    this.userCheck = getIcon('faUserCheck');
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

  get checkIfMegaCenter() {
    const helper = new JwtHelperService();
    const token = this.authService.userToken;

    if (token) {
      const user = helper.decodeToken(token);
      if (user.is_mega_center) {
        return true;
      }
    }
    return false;
  }

  logout(drawer: any) {
    drawer.toggle();
    this.authService.logout();
  }
}
