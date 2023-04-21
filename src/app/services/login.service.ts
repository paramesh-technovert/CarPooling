import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import { LoginRequest } from '../modals/LoginRequest';
import { LoginResponse } from '../modals/LoginResponse';
import { UserDetails } from '../modals/UserDetails';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private httpClient:HttpClient) { }
  addUser(loginRequest:LoginRequest){
    return this.httpClient.post(
      'https://localhost:7103/api/Login/SignUp',JSON.stringify(loginRequest),{
        headers:new HttpHeaders({
          'Content-type':'application/json'
        })
    })
  }
  loginUser(loginRequest:LoginRequest):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(
      'https://localhost:7103/api/Login/SignIn',JSON.stringify(loginRequest),{
        headers:new HttpHeaders({
          'content-type':'application/json'
        })
    })
  }
  getUserDetails(id:string):Observable<UserDetails>{
    return this.httpClient.get<UserDetails>(
      'https://localhost:7103/api/UserDetails',{
        headers:new HttpHeaders({
          'content-type':'application/json',
          'id':id
        })
    })
  }
}