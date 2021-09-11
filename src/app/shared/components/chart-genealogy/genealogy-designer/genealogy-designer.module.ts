import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenealogyNodeModule } from '../genealogy-node/genealogy-node.module';
import { GenealogyDesignerComponent } from './genealogy-designer.component';

@NgModule({
  declarations: [GenealogyDesignerComponent],
  imports: [CommonModule, GenealogyNodeModule],
  exports: [GenealogyDesignerComponent],
})
export class GenealogyDesignerModule {}
