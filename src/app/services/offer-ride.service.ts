import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferRideRequest } from '../modals/OfferRideRequest';

@Injectable({
  providedIn: 'root'
})
export class OfferRideService {

  constructor(private httpClient:HttpClient) { }
  offerRide(offerRideRequest:OfferRideRequest){
    console.log(offerRideRequest);
    return this.httpClient.post(
      'https://localhost:7103/api/OfferRide',
      offerRideRequest,{
        headers:new HttpHeaders({
          'Content-type':'application/json'
        })
    })
  }
}
