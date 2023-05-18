import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-snackbar',
  templateUrl: './dashboard-snackbar.component.html',
  styleUrls: ['./dashboard-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<DashboardSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
