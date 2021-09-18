import { TestBed } from '@angular/core/testing';

import { DirectSellingService } from './direct-selling.service';

describe('DirectSellingService', () => {
  let service: DirectSellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectSellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
