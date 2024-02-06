import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { Reaction } from '../../enums/Reaction';
import { PostService } from '../../services/post-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {



  @Input() post!: Post;
  @Output() postDeleted: EventEmitter<any> = new EventEmitter();
  @Output() postEdited: EventEmitter<any> = new EventEmitter();


  Reaction = Reaction;
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
    private dialogService: DialogService) { }

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

  react(Reaction: Reaction) {
    this.postService.reactToPost(this.post.id, Reaction).subscribe(
      data => {
        this.countReaction.next(data);

      }
    );
  }

  getImage() {
    if (this.post.imageUrl == null || this.post.imageUrl == '') {
      this.loading = false;
      return;
    }
    this.store.ref(this.post.imageUrl.toString()).getDownloadURL().subscribe(
      url => {
        this.imageUrl = url;
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

interface CountReaction {
  overall: number,
  like: number,
  love: number,
  haha: number,
  sad: number,
  angry: number,
}