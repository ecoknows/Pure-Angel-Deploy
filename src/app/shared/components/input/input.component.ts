import { Component, Input, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getIcon } from '../icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent implements OnInit {
  faSearch = faSearch;
  @Input('title') title: string = 'Input';
  @Input('placeholder') placeholder!: string;
  @Input('suffix-icon') suffix_icon: any;
  @Input('class-form-field') class_form_field!: string;

  ngOnInit(): void {
    this.suffix_icon = getIcon(this.suffix_icon);
  }
}
