import { TestBed } from '@angular/core/testing';

import { UserSupplyService } from './user-supply.service';

describe('UserSupplyService', () => {
  let service: UserSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
