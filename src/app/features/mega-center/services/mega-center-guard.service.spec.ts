import { TestBed } from '@angular/core/testing';

import { MegaCenterGuardService } from './mega-center-guard.service';

describe('MegaCenterGuardService', () => {
  let service: MegaCenterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaCenterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
