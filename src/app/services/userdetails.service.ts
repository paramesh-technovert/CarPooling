import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsRequest } from '../modals/UserDetailsRequest';
import { getUserDetails, updateuserDetails } from '../EndPoints/EndPoints';
import { UserDetails } from '../modals/UserDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor(private httpClient: HttpClient) { }
  getUserDetails(id: string): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(
      getUserDetails, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'id': id
      })
    })
  }
  updateDetails(userDetailsRequest: UserDetailsRequest) {
    return this.httpClient.put(updateuserDetails,
      userDetailsRequest, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
}
