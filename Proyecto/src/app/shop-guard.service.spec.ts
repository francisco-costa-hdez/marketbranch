import { TestBed } from '@angular/core/testing';

import { ShopGuard } from './shop-guard.service';

describe('ShopGuard', () => {
  let service: ShopGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
