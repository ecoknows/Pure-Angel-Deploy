import { TestBed } from '@angular/core/testing';

import { UpgradeAccountService } from './upgrade-account.service';

describe('UpgradeAccountService', () => {
  let service: UpgradeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpgradeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
