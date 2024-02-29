import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponsePayload } from '../models/LoginResponsePayload';
import { LoginRequestPayload } from '../models/LoginRequestPayload';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestPayload } from '../models/RegisterRequestPayload';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:5000/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.http.post<LoginResponsePayload>(this.authUrl + '/login', credentials);
  }

  register(registerPayload: RegisterRequestPayload): Observable<any> {
    return this.http.post(this.authUrl + '/register', registerPayload);
  }

  setToken(token: LoginResponsePayload) {
    localStorage.setItem('jwtToken', token.accessToken);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/login');

  }

}
