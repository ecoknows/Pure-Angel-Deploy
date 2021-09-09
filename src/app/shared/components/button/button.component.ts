import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { getIcon } from '../icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent implements OnInit {
  @Input('title') title: string = 'Button';
  @Input('icon') icon: any;

  ngOnInit(): void {
    this.icon = getIcon(this.icon);
  }
}
