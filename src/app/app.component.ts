import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'pure-angel-coffee';

  constructor(public sideBarService: SidebarService) {}

  ngOnInit(): void {}
}
