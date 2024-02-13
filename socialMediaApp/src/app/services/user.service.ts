import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:5000/api/v1/user';

  constructor(private http: HttpClient) { }

  getUserId(): Observable<number> {
    return this.http.get<number>(this.userUrl + '/userId');
  }

  getUserProfileById(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.userUrl + `/${userId}`);
  }

  //getUserProfile(): Observable<UserProfile> {}


  updateUserProfile(user: any): Observable<UserProfile> { //zmienic na odpowiednie!!
    return this.http.patch<any>(this.userUrl, user);
  }
}
