import { TestBed } from '@angular/core/testing';

import { MegaStockAdminGuardService } from './mega-stock-admin-guard.service';

describe('MegaStockAdminGuardService', () => {
  let service: MegaStockAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaStockAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
