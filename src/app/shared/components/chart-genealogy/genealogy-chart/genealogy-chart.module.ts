import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenealogyDesignerModule } from '../genealogy-designer/genealogy-designer.module';
import { GenealogyChartComponent } from './genealogy-chart.component';

@NgModule({
  declarations: [GenealogyChartComponent],
  imports: [CommonModule, GenealogyDesignerModule],
  exports: [GenealogyChartComponent],
})
export class GenealogyChartModule {}
