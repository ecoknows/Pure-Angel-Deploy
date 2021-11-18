import { TestBed } from '@angular/core/testing';

import { PinHistoryService } from './pin-history.service';

describe('PinHistoryService', () => {
  let service: PinHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
