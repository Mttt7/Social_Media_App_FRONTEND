import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  pageNumber: number = 0;
  mode: string = '';

  loading: boolean = false;
  noMorePosts: boolean = false;
  refreshed: boolean = false;



  constructor(private postService: PostService, private route: ActivatedRoute,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pageNumber = 0;
      this.noMorePosts = false;
      this.posts = [];
      this.mode = params.get('feedType')!;
      this.getPosts(this.mode);
    })
  }

  getPosts(feedType: string, loadmore: boolean = false) {
    if (feedType === 'feed') {
      this.postService.getFeedPosts(this.pageNumber).subscribe(
        data => {
          if (data.last) this.noMorePosts = true

          if (loadmore) this.posts = this.posts.concat(data.content as Post[])
          else this.posts = data.content as Post[];

          this.loading = false;
        }
      )
    } else if (feedType === 'friends') {
      this.postService.getFriendsPosts(this.pageNumber).subscribe(
        data => {
          if (data.last) this.noMorePosts = true;

          if (loadmore) this.posts = this.posts.concat(data.content as Post[])
          else this.posts = data.content as Post[];

          this.loading = false;
        }
      )
    }
  }

  refresh() {
    this.getPosts(this.mode);
  }

  loadMorePosts() {
    this.loading = true;
    this.pageNumber++;
    this.getPosts(this.mode, true);
  }

  openDialog() {
    this.dialogService.openAddPostDialog().subscribe(
      data => {
        if (data == 'cancel') return
        this.refresh();
      }
    )
  }
}


