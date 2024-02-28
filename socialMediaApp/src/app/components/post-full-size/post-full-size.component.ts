import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserProfile } from '../../models/UserProfile';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/Post';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Reaction } from '../../enums/Reaction';
import { DialogService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/Comment';


interface CountReaction {
  overall: number,
  like: number,
  love: number,
  haha: number,
  sad: number,
  angry: number,
}
interface CommentRespone {
  content: Comment[],
  totalElements: number,
  totalPages: number,
  last: boolean,
  size: number,
  number: number,
  sort: any,
  first: boolean,
  numberOfElements: number,
  empty: boolean

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

  commentContent = ''

  post!: Post;
  comments: Comment[] = [];

  pageNumber: number = 0;
  noMoreComments = false;
  addCommentFormShown = false;


  constructor(private postService: PostService, private route: ActivatedRoute,
    private dialogService: DialogService, private userService: UserService, private commonService: CommonService,
    private router: Router, private commentService: CommentService) { }

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
    this.pageNumber = 0;
    this.noMoreComments = false;
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.postId = params['id'];
        this.getPost();
        this.getReactionCount();
        this.getComments();
      }
    )
    this.userService.getUserId().subscribe(
      id => {
        this.userId = id;
      }
    )

  }

  getComments(loadmore: boolean = false) {
    this.commentService.getComments(this.postId, this.pageNumber).subscribe(
      data => {
        if (loadmore) this.comments = this.comments.concat(data.content as Comment[]);
        else this.comments = data.content;

        if (data.last) this.noMoreComments = true;
        this.loading = false;
      }
    )
  }

  loadMoreComments() {
    this.loading = true;
    this.pageNumber++;
    this.getComments(true);
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

  addEmoji($event: any, type: string) {
    if (this.commentContent === undefined) {
      this.commentContent = '' + $event.emoji.native;
    } else {
      this.commentContent = this.commentContent + $event.emoji.native;
    }

  }

  addComment() {
    this.commentService.addComment(this.postId, this.commentContent).subscribe(
      data => {
        this.getComments();
        this.commentContent = '';
      }
    )
  }

  toggleAddCommentForm() {
    this.addCommentFormShown = !this.addCommentFormShown;
  }

  commentDeleted(id: number) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }




}
