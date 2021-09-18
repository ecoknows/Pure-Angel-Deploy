import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardTotalNumberComponent } from '@shared/components';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
    DialogComponent,
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
  ],
  exports: [
    CardTotalNumberComponent,
    TableComponent,
    ButtonComponent,
    InputComponent,
  ],
})
export class SharedModule {}
