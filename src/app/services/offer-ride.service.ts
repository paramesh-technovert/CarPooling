import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferRideRequest } from '../modals/OfferRideRequest';
import { getOfferedRides, postOfferedRides } from '../EndPoints/EndPoints';
import { Observable } from 'rxjs';
import { OfferedRides } from '../modals/OfferedRides';

@Injectable({
  providedIn: 'root'
})
export class OfferRideService {

  constructor(private httpClient: HttpClient) { }
  getOfferedRides(id: string): Observable<OfferedRides[]> {
    return this.httpClient.get<OfferedRides[]>(
      getOfferedRides,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Id': id
        })
      }
    )
  }
  offerRide(offerRideRequest: OfferRideRequest) {
    console.log(offerRideRequest);
    return this.httpClient.post(
      postOfferedRides,
      offerRideRequest, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
}
