import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { Reaction } from '../../enums/Reaction';
import { PostService } from '../../services/post-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../services/dialog.service';
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
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {



  @Input() post!: Post;
  @Output() postDeleted: EventEmitter<any> = new EventEmitter();
  @Output() postEdited: EventEmitter<any> = new EventEmitter();


  reaction = Reaction;
  imageUrl: string = '';
  userId: number = -1;
  loading: boolean = false;


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

  constructor(private postService: PostService, private store: AngularFireStorage, private userService: UserService,
    private dialogService: DialogService, private commonService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.postService.getReactionCount(this.post.id).subscribe(
      data => {
        this.countReaction.next(data);
      }
    )
    this.userService.getUserId().subscribe(
      data => {
        this.userId = data;
      })
    this.getImage();
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
        this.postDeleted.emit();
      }
    )
  }
  editPost() {
    this.dialogService.openEditPostDialog(this.post).subscribe(
      data => {
        this.postEdited.emit();
      }
    )
  }

}

