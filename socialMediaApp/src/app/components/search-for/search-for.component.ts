import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { UserProfile } from '../../models/UserProfile';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-search-for',
  templateUrl: './search-for.component.html',
  styleUrl: './search-for.component.scss'
})
export class SearchForComponent {


  @ViewChild('searchInput') searchInput!: ElementRef;

  stateOptions: any[] = [
    { label: 'Users', value: 'users' },
    { label: 'Posts', value: 'posts' }
  ];
  mode: string = 'users';
  pageNumber: number = 0;

  users: UserProfile[] = [];
  posts: Post[] = [];


  noMorePosts: boolean = false;

  constructor(private searchService: SearchService) {

  }

  search(loadMore: boolean = false) {
    let searchQuery = this.searchInput.nativeElement.value;
    if (searchQuery === '') {
      return;
    }
    if (this.mode === 'users') {
      this.searchService.searchForUser(searchQuery, this.pageNumber, 12).subscribe(
        data => {
          if (loadMore) this.users = this.users.concat(data.content);
          else this.users = data.content;
          if (data.last) {
            this.noMorePosts = true;
          }
        }
      )
    }
    else if (this.mode === 'posts') {
      this.searchService.searchForPost(searchQuery, this.pageNumber, 10).subscribe(
        data => {
          if (loadMore) this.posts = this.posts.concat(data.content);
          else this.posts = data.content;
          if (data.last) {
            this.noMorePosts = true;
          }
        }
      )
    }
  }

  loadMore() {
    this.pageNumber++;
    this.search(true);
  }

  toggleMode() {
    this.pageNumber = 0;
    this.noMorePosts = false;
    this.search();
  }

}
