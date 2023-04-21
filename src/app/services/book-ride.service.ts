import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchedRidesRequest } from '../modals/MatchedRideRequest';
import { MatchedRidesResponse } from '../modals/MatchedRideResponse';
import { Observable } from 'rxjs';
import { BookRideRequestDTO } from '../modals/BookRideRequest';
import { BookedRides } from '../modals/BookedRides';
import { OfferedRides } from '../modals/OfferedRides';

@Injectable({
  providedIn: 'root'
})
export class BookRideService{

  constructor(private httpClient:HttpClient) { }
  getMatchedRides(matchedRideRequest:MatchedRidesRequest):Observable<MatchedRidesResponse[]> {
    return  this.httpClient.post<MatchedRidesResponse[]>(
      'https://localhost:7103/api/MatchedRides',
      JSON.stringify(matchedRideRequest),
      {
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
  })
  }
  bookRide(bookRideRequest:BookRideRequestDTO){
    console.log(bookRideRequest);
    return this.httpClient.post(
      'https://localhost:7103/api/BookRide',
      JSON.stringify(bookRideRequest),
      {
        headers:new HttpHeaders({
          'Content-type':'application/json'
        })
    })
  }
  getBookedRides(id:string):Observable<BookedRides[]>{
    return this.httpClient.get<BookedRides[]>(
      'https://localhost:7103/api/BookRide',
      {
        headers:new HttpHeaders({
          'Content-type':'application/json',
          'userId':id
        })
      }
    )
  }
  getOfferedRides(id:string):Observable<OfferedRides[]>{
    return this.httpClient.get<OfferedRides[]>(
      'https://localhost:7103/api/OfferRide/OfferedRides',
      {
        headers:new HttpHeaders({
          'Content-type':'application/json',
          'Id':id
        })
      }
    )
  }
}
