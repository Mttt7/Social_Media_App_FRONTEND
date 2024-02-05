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

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('feedType') === 'feed') {
        this.postService.getFeedPosts().subscribe(
          data => {
            this.posts = data.content as Post[]
          }
        )
      } else if (params.get('feedType') === 'user') {
        this.postService.getUserPosts().subscribe(
          data => {
            this.posts = data.content as Post[]
          }
        )
      }
    })
  }
  refresh() {
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

