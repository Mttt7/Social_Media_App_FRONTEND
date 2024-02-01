import { Component, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { Reaction } from '../../enums/Reaction';
import { PostService } from '../../services/post-service.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input() post!: Post;
  Reaction = Reaction;


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

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getReactionCount(this.post.id).subscribe(
      data => {
        this.countReaction.next(data);
      }
    )

    // this.countReaction.subscribe(reaction => {

    // });
  }

  react(Reaction: Reaction) {
    this.postService.reactToPost(this.post.id, Reaction).subscribe(
      data => {
        this.countReaction.next(data);

      }
    );
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