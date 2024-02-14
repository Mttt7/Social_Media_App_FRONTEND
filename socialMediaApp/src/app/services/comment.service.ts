import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentUrl = 'http://localhost:5000/api/v1/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<GetResponseComments> {
    let pageNumber = 0;
    return this.http.get<GetResponseComments>(`${this.commentUrl}/${postId}?pageSize=10&pageNumber=${pageNumber}`);
  }

  addComment(postId: number, commentContent: string): Observable<string> {
    return this.http.post<string>(`${this.commentUrl}/${postId}`, commentContent);
  }
}

interface GetResponseComments {
  content: Comment[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}