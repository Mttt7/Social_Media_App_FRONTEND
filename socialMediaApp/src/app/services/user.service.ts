import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:5000/api/v1/user/userId');
  }

  getUserProfileById(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`http://localhost:5000/api/v1/user/${userId}`);
  }
}
