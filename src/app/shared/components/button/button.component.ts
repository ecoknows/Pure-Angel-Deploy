import { Component } from '@angular/core';
import { faDesktop, faBell, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  faUsers = faUsers;
}
