import { TestBed } from '@angular/core/testing';

import { HistoryTimelineService } from './history-timeline.service';

describe('HistoryTimelineService', () => {
  let service: HistoryTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
