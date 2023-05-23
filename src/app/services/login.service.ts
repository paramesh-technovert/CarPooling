import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import { LoginRequest } from '../modals/LoginRequest';
import { LoginResponse } from '../modals/LoginResponse';
import { UserDetails } from '../modals/UserDetails';
import { getUserDetails, signIn, signUp } from '../EndPoints/EndPoints';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  addUser(loginRequest: LoginRequest) {
    return this.httpClient.post(
      signUp, JSON.stringify(loginRequest), {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
  }
  loginUser(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      signIn, JSON.stringify(loginRequest), {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    })
  }
}