import { TestBed } from '@angular/core/testing';

import { NotLoggedGuard} from './not-logged-guard.service';

describe('LoggedGuardService', () => {
  let service: NotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotLoggedGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
