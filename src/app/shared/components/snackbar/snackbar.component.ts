import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.sass'],
})
export class SnackbarComponent implements OnInit {
  errorIcon = faTimesCircle;
  successIcon = faCheckCircle;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: {
      message: string;
      error: boolean;
    }
  ) {}

  ngOnInit(): void {}
}
