import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardTotalNumberComponent } from '@shared/components';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimelineChartComponent } from './components/timeline-chart/timeline-chart.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
    CreateDialogComponent,
    TimelineChartComponent,
    SnackbarComponent,
    TopBarComponent,
    SearchComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxDatatableModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
    TopBarComponent,
  ],
})
export class SharedModule {}
