import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/Comment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Reaction } from '../../enums/Reaction';
import { CommentService } from '../../services/comment.service';

interface CountReaction {
  overall: number,
  like: number,
  love: number,
  haha: number,
  sad: number,
  angry: number,
}


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

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

  @Input() comment: Comment = {} as Comment;
  reaction = Reaction;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    if (this.comment.id === undefined || this.comment.id == null) return;
    this.commentService.getReactionCount(this.comment.id).subscribe(
      data => {
        this.countReaction.next(data);
      }
    );
  }

  react(reaction: Reaction) {
    this.commentService.reactToComment(this.comment.id, reaction).subscribe(
      data => {
        this.countReaction.next(data);
      }
    );
  }
}
