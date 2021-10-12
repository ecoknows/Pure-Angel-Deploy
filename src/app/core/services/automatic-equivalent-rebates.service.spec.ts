import { TestBed } from '@angular/core/testing';

import { AutomaticEquivalentRebatesService } from './automatic-equivalent-rebates.service';

describe('AutomaticEquivalentRebatesService', () => {
  let service: AutomaticEquivalentRebatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomaticEquivalentRebatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
