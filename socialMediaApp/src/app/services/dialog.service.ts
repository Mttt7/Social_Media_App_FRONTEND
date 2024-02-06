import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddPostDialogComponent } from '../dialogs/add-post-dialog/add-post-dialog.component';
import { EditPostDialogComponent } from '../dialogs/edit-post-dialog/edit-post-dialog.component';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAddPostDialog(): Observable<any> {
    const dialogRef: MatDialogRef<AddPostDialogComponent> = this.dialog.open(AddPostDialogComponent, {
      width: '520px',
    });
    return dialogRef.afterClosed();
  }

  openEditPostDialog(post: Post): Observable<any> {
    const dialogRef: MatDialogRef<EditPostDialogComponent> = this.dialog.open(EditPostDialogComponent, {
      width: '520px',
      data: {
        post: post
      }
    });
    return dialogRef.afterClosed();
  }


}
