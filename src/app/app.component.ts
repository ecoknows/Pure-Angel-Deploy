import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { SidebarService } from '@core/services/sidebar.service';
import { TopBarService } from '@core/services/top-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'pure-angel-coffee';
  showFiller = false;

  constructor(
    public sideBarService: SidebarService,
    public topBarService: TopBarService,
    public loaderService: LoaderService
  ) {}

  showSidebar() {
    this.sideBarService.buttonShow = !this.sideBarService.buttonShow;
  }
}
