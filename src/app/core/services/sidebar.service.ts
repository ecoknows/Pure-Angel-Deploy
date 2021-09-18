import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  visibility: boolean = true;

  hide() {
    this.visibility = false;
  }

  show() {
    this.visibility = true;
  }
}
