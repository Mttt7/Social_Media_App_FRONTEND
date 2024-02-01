import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponsePayload } from '../models/LoginResponsePayload';
import { LoginRequestPayload } from '../models/LoginRequestPayload';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:5000/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.http.post<LoginResponsePayload>(this.authUrl + '/login', credentials);
  }

  setToken(token: LoginResponsePayload) {
    localStorage.setItem('jwtToken', token.accessToken);
  }

}
