import { TestBed } from '@angular/core/testing';

import { IncomeHistoryService } from './income-history.service';

describe('IncomeHistoryService', () => {
  let service: IncomeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
