import { TestBed } from '@angular/core/testing';

import { CreateNewPinService } from './create-new-pin.service';

describe('CreateNewPinService', () => {
  let service: CreateNewPinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewPinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
