import { Component } from '@angular/core';
import { faDesktop, faBell, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
})
export class SideBarComponent {
  menus = [
    {
      url: 'dashboard',
      icon: faDesktop,
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
}
