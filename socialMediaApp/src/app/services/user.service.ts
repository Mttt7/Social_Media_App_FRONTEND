import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:5000/api/v1/user/userId');
  }
}
