import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { ReactionCountResponse } from '../models/ReactionCountResponse';
import { PostCreateRequestPayload } from '../models/PostCreateRequestPayload';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }

  postUrl = 'http://localhost:5000/api/v1/posts';

  getLoggedUserPosts(pageNumber: number): Observable<GetResponsePosts> {
    let id = localStorage.getItem('userId');
    return this.http.get<GetResponsePosts>(`${this.postUrl}?id=${id}&pageSize=10&pageNumber=${pageNumber}`);
  }

  getUserPosts(userId: number, pageNumber: number): Observable<GetResponsePosts> {
    return this.http.get<GetResponsePosts>(`${this.postUrl}?id=${userId}&pageSize=10&pageNumber=${pageNumber}`);
  }
  getFriendsPosts(pageNumber: number): Observable<GetResponsePosts> {
    return this.http.get<GetResponsePosts>(`${this.postUrl}/friends?pageSize=10&pageNumber=${pageNumber}`);
  }

  getFeedPosts(pageNumber: number): Observable<GetResponsePosts> {
    return this.http.get<GetResponsePosts>(`${this.postUrl}/feed?pageSize=10&pageNumber=${pageNumber}`);
  }

  getReactionCount(postId: number): Observable<ReactionCountResponse> {
    return this.http.get<ReactionCountResponse>(`${this.postUrl}/${postId}/reactions`);
  }

  reactToPost(postId: number, reaction: number): Observable<ReactionCountResponse> {
    return this.http.post<ReactionCountResponse>(`${this.postUrl}/${postId}/${reaction}`, null);
  }

  addPost(post: PostCreateRequestPayload): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post);
  }
  editPost(post: PostCreateRequestPayload, postId: number): Observable<Post> {
    return this.http.patch<Post>(`${this.postUrl}/${postId}`, post);
  }
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.postUrl}/${postId}`);
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${postId}`);
  }

  getBestComment(postId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.postUrl}/${postId}/bestComment`);
  }

}

interface GetResponsePosts {
  content: Post[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}

