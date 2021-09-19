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

@NgModule({
  declarations: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
    CreateDialogComponent,
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
  ],
  exports: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
  ],
})
export class SharedModule {}
