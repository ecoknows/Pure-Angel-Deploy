import { TestBed } from '@angular/core/testing';

import { PairingBonusService } from './pairing-bonus.service';

describe('PairingBonusService', () => {
  let service: PairingBonusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PairingBonusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
