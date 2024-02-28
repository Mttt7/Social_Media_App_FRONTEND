import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { StringResponse } from '../models/StringResponse';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {



  userUrl = 'http://localhost:5000/api/v1/user';

  constructor(private http: HttpClient) { }

  sendFriendRequest(friendId: number): Observable<StringResponse> {
    return this.http.post<StringResponse>(this.userUrl + `/friendship/${friendId}`, null);
  }

  removeFriendShip(friendId: number): Observable<StringResponse> {
    return this.http.delete<StringResponse>(this.userUrl + `/friendship/${friendId}`);
  }

  getStatus(userId: number): Observable<StringResponse> {
    return this.http.get<StringResponse>(this.userUrl + '/' + userId + '/status');
  }

  getFriendsList(userId: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userUrl + '/' + userId + '/friends');
  }

  getSentRequests(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userUrl + '/friendRequests/sent');
  }

  getReceivedRequests(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userUrl + '/friendRequests/received');
  }

  searchFriend(userId: number, searchQuery: string) {
    if (searchQuery === '') {
      return this.getFriendsList(userId);
    }
    return this.http.get<UserProfile[]>(this.userUrl + '/' + userId + '/searchFriends/' + searchQuery);
  }

}
