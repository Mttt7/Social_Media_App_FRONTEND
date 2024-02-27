import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';
import { Observable } from 'rxjs';
import { ReactionCountResponse } from '../models/ReactionCountResponse';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  commentUrl = 'http://localhost:5000/api/v1/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: number, pageNumber: number): Observable<GetResponseComments> {

    return this.http.get<GetResponseComments>(`${this.commentUrl}/${postId}?pageSize=10&pageNumber=${pageNumber}`);
  }

  addComment(postId: number, commentContent: string): Observable<string> {
    return this.http.post<string>(`${this.commentUrl}/${postId}`, commentContent);
  }

  reactToComment(commentId: number, reaction: number): Observable<ReactionCountResponse> {
    return this.http.post<ReactionCountResponse>(`${this.commentUrl}/${commentId}/${reaction}`, null);
  }
  getReactionCount(commentId: number): Observable<ReactionCountResponse> {
    return this.http.get<ReactionCountResponse>(`${this.commentUrl}/${commentId}/reactions`);
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