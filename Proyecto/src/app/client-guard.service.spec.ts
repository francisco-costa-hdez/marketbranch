import { TestBed } from '@angular/core/testing';

import { ClientGuard } from './client-guard.service';

describe('ClientGuardService', () => {
  let service: ClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
