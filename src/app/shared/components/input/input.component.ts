import { Component, Input } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent {
  faSearch = faSearch;
  @Input('title') title: string = 'Input';
  @Input('placeholder') placeholder: string = 'Place Holder';
}
