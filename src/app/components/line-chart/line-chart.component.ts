import { Component, OnInit } from '@angular/core';
import { multi } from './example-data';
import { curveBumpX } from 'd3-shape';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.sass'],
})
export class LineChartComponent implements OnInit {
  multi: any[] | undefined;

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  showGridLines: boolean = false;
  curve: any = curveBumpX;

  colorScheme: any = {
    domain: ['#643E23'],
  };

  constructor() {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {}
}
