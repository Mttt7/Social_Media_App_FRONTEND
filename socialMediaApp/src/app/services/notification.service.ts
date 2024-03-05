import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsUrl = 'http://localhost:5000/api/v1/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(pageNumber: number, pageSize: number): Observable<GetResponseNotifications> {
    return this.http.get<GetResponseNotifications>(this.notificationsUrl + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post(`${this.notificationsUrl}/${id}`, {});
  }

  countNotReadNotifications(): Observable<GetResponseCount> {
    return this.http.get<GetResponseCount>(this.notificationsUrl + '/countUnread');

  }

}

interface GetResponseNotifications {
  content: Notification[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}

interface GetResponseCount {
  count: number;
}
