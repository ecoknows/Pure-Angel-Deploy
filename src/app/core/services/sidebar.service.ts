import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  visibility: boolean = true;
  buttonShow: any;

  hide() {
    this.visibility = false;
  }

  show() {
    this.visibility = true;
  }
}
