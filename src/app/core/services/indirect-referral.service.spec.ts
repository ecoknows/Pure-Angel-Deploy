import { TestBed } from '@angular/core/testing';

import { IndirectReferralService } from './indirect-referral.service';

describe('IndirectReferralService', () => {
  let service: IndirectReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndirectReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
