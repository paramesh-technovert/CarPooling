import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsRequest } from '../modals/UserDetailsRequest';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor(private httpClient:HttpClient) { }
  updateDetails(userDetailsRequest:UserDetailsRequest){
    return this.httpClient.put('https://localhost:7103/api/UserDetails',
    userDetailsRequest,{
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
  })
  }
}
