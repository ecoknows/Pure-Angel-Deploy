import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { multi } from './example-data';
import { curveBumpX } from 'd3-shape';
import { HistoryTimelineService } from '@core/services/history-timeline.service';
import { Store } from '@ngrx/store';
import { HistoryState } from '@core/redux/history/history.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryTimelineComponent implements OnInit {
  history$: Observable<HistoryState[]>;

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  showGridLines: boolean = true;
  curve: any = curveBumpX;

  colorScheme: any = {
    domain: ['#0c73c2'],
  };

  constructor(
    private historyService: HistoryTimelineService,
    private store: Store<{ historyReducer: HistoryState[] }>
  ) {
    this.history$ = this.store.select('historyReducer');
  }

  ngOnInit(): void {
    this.historyService.fetchHistoryTimeline();
  }
}
