import { TestBed } from '@angular/core/testing';

import { MegaCenterService } from './mega-center.service';

describe('MegaCenterService', () => {
  let service: MegaCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MegaCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
