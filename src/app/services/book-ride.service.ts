import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchedRidesRequest } from '../modals/MatchedRideRequest';
import { MatchedRidesResponse } from '../modals/MatchedRideResponse';
import { Observable } from 'rxjs';
import { BookRideRequestDTO } from '../modals/BookRideRequest';
import { BookedRides } from '../modals/BookedRides';
import { OfferedRides } from '../modals/OfferedRides';
import { getBookedRides, getMatchedRides, getOfferedRides, postBookedRides } from '../EndPoints/EndPoints';

@Injectable({
  providedIn: 'root'
})
export class BookRideService {

  constructor(private httpClient: HttpClient) { }
  getMatchedRides(matchedRideRequest: MatchedRidesRequest): Observable<MatchedRidesResponse[]> {
    return this.httpClient.post<MatchedRidesResponse[]>(
      getMatchedRides,
      JSON.stringify(matchedRideRequest),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      })
  }
  bookRide(bookRideRequest: BookRideRequestDTO) {
    console.log(bookRideRequest);
    return this.httpClient.post(
      postBookedRides,
      JSON.stringify(bookRideRequest),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      })
  }
  getBookedRides(id: string): Observable<BookedRides[]> {
    return this.httpClient.get<BookedRides[]>(
      getBookedRides,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'userId': id
        })
      }
    )
  }

}
