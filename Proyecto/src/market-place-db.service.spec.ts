import { TestBed } from '@angular/core/testing';

import { MarketPlaceDBService } from './market-place-db.service';

describe('MarketPlaceDBService', () => {
  let service: MarketPlaceDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketPlaceDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
