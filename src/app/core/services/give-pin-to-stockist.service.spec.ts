import { TestBed } from '@angular/core/testing';

import { GivePinToStockistService } from './give-pin-to-stockist.service';

describe('GivePinToStockistService', () => {
  let service: GivePinToStockistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GivePinToStockistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
