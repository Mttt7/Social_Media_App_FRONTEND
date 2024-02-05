import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  posts: Post[] = [];
  loading: boolean = false;
  pageNumber: number = 0;
  noMorePosts: boolean = false;
  refreshed: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {

    this.route.paramMap.subscribe((params) => {
      if (params.get('feedType') === 'feed') {
        this.postService.getFeedPosts(this.pageNumber).subscribe(
          data => {
            if (data.last) {
              this.noMorePosts = true;
            }
            if (this.refreshed) {
              this.posts = data.content as Post[];
            } else {
              this.posts = this.posts.concat(data.content as Post[])
            }

            this.loading = false;
          }
        )
      } else if (params.get('feedType') === 'user') {
        this.postService.getUserPosts(this.pageNumber).subscribe(
          data => {
            if (data.last) {
              this.noMorePosts = true;
            }
            if (this.refreshed) {
              this.posts = data.content as Post[];
            } else {
              this.posts = this.posts.concat(data.content as Post[])
            }
            this.posts = this.posts.concat(data.content as Post[])
            this.loading = false;
          }
        )
      }
    })
  }
  refresh() {
    this.refreshed = true;
    this.getPosts();
  }

  loadMorePosts() {
    this.loading = true;
    this.pageNumber++;
    this.getPosts();
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

