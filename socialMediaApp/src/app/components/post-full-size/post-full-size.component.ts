import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserProfile } from '../../models/UserProfile';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/Post';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Reaction } from '../../enums/Reaction';
import { DialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';


interface CountReaction {
  overall: number,
  like: number,
  love: number,
  haha: number,
  sad: number,
  angry: number,
}


@Component({
  selector: 'app-post-full-size',
  templateUrl: './post-full-size.component.html',
  styleUrl: './post-full-size.component.scss'
})
export class PostFullSizeComponent implements OnInit {


  reaction = Reaction;
  imageUrl: string = '';
  loading: boolean = false;
  postId: number = -1;

  userId: number = -1;

  post!: Post;

  constructor(private postService: PostService, private route: ActivatedRoute,
    private dialogService: DialogService, private userService: UserService, private commonService: CommonService,
    private router: Router) { }

  countReaction: Subject<CountReaction> = new BehaviorSubject<CountReaction>(
    {
      overall: 0,
      like: 0,
      love: 0,
      haha: 0,
      sad: 0,
      angry: 0,
    }
  );

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.postId = params['id'];
        this.getPost();
        this.getReactionCount();
      }
    )
    this.userService.getUserId().subscribe(
      id => {
        this.userId = id;
      }
    )

  }

  getReactionCount() {
    this.postService.getReactionCount(this.postId).subscribe(
      data => {
        this.countReaction.next(data);
      }
    )
  }

  getPost() {
    this.postService.getPostById(this.postId).subscribe(
      post => {
        this.post = post;
        this.loading = false;
        this.getImage();
      }
    )
  }



  react(reaction: Reaction) {
    this.postService.reactToPost(this.post.id, reaction).subscribe(
      data => {
        this.countReaction.next(data);
      }
    );
  }

  getImage() {
    this.commonService.getImageFromStore(this.post.imageUrl).subscribe(
      data => {
        this.imageUrl = data;
        this.loading = false;
      }
    )
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(
      data => {
        this.router.navigate(['/home']);
      }
    )
  }
  editPost() {
    this.dialogService.openEditPostDialog(this.post).subscribe(
      data => {
        this.getPost();
      }
    )
  }




}
