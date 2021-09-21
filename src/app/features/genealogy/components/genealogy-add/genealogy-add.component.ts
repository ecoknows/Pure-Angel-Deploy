import { Component, Input } from '@angular/core';
import { Genealogy } from '@core/redux/genealogy/genealogy.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '@shared/components/create-dialog/create-dialog.component';

@Component({
  selector: 'genealogy-add',
  templateUrl: './genealogy-add.component.html',
  styleUrls: ['./genealogy-add.component.sass'],
})
export class GenealogyAddComponent {
  @Input('node') node!: Genealogy | undefined;
  @Input('position') position: 'left' | 'right' = 'left';

  constructor(public dialog: MatDialog) {}

  addDirectRefferal() {
    this.dialog.open(CreateDialogComponent, {
      data: { position: this.position, root_id: this.node?._id },
    });
  }
}
