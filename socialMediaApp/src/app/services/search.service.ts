import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { UserProfile } from '../models/UserProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) { }

  searchUrl = 'http://localhost:5000/api/v1/search';

  searchForPost(searchQuery: string, pageNumber: number, pageSize: number): Observable<PostSearchResponse> {
    return this.http.get<PostSearchResponse>(this.searchUrl + "/post/" + searchQuery + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
  }

  searchForUser(searchQuery: string, pageNumber: number, pageSize: number): Observable<UserSearchResponse> {
    return this.http.get<UserSearchResponse>(this.searchUrl + "/user/" + searchQuery + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize);
  }
}


interface PostSearchResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
}

interface UserSearchResponse {
  content: UserProfile[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
}