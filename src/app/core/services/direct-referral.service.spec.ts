import { TestBed } from '@angular/core/testing';

import { DirectReferralService } from './direct-referral.service';

describe('DirectReferralService', () => {
  let service: DirectReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
