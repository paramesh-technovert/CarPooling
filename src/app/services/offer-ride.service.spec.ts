import { TestBed } from '@angular/core/testing';

import { OfferRideService } from './offer-ride.service';

describe('OfferRideService', () => {
  let service: OfferRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
