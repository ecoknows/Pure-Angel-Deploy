import { TestBed } from '@angular/core/testing';

import { UserCashoutsService } from './user-cashouts.service';

describe('UserCashoutsService', () => {
  let service: UserCashoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCashoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
