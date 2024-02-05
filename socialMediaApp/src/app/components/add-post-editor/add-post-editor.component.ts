import { Component, ViewChild, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Observable, map, switchMap } from 'rxjs';
import { PostCreateRequestPayload } from '../../models/PostCreateRequestPayload';
import { Router } from '@angular/router';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-add-post-editor',
  templateUrl: './add-post-editor.component.html',
  styleUrls: ['./add-post-editor.component.scss'],

})
export class AddPostEditorComponent {

  uploadedFile: any;
  selectedFile!: ImageSnippet;
  uploadedImagePath: string = '';

  topicId: number = -1;

  expanded: boolean = false;
  text!: string;
  emojiShown: boolean = false;
  title: string = '';

  path: string = ''

  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('imageInput') imageInput!: ElementRef;
  @Output() postAdded: EventEmitter<any> = new EventEmitter();

  constructor(private postService: PostService, private store: AngularFireStorage,
    private messageService: MessageService, private userService: UserService, private router: Router) { }

  onUpload(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.getFileName().subscribe((path) => {
        this.store.upload(path, this.selectedFile.file).then((res) => {
          this.uploadedImagePath = res.metadata.fullPath
        })
      })
    })
    reader.readAsDataURL(file);
  }

  getFileName(): Observable<string> {
    return this.userService.getUserId().pipe(
      switchMap(id => this.userService.getUserProfileById(id)),
      map(user => 'images/' + user.username + '/posts/' + Math.floor(Math.random() * (999999999 - 99 + 1)) + 99)
    );
  }



  toggleExpand() {
    this.expanded = !this.expanded;
  }

  addEmoji($event: any, type: string) {
    if (type === 'content') {
      if (this.text === undefined) {
        this.text = '' + $event.emoji.native;
      } else {
        this.text = this.text + $event.emoji.native;
      }
    } else if (type === 'title') {
      if (this.title === undefined) {
        this.title = '' + $event.emoji.native;
      } else {
        this.title = this.title + $event.emoji.native;
      }
    }
  }
  toggleEmojis() {
    this.emojiShown = !this.emojiShown;
  }


  publish() {
    if (this.text?.length < 2 || this.title?.length < 2) return;
    this.postService.addPost(
      new PostCreateRequestPayload(this.title,
        this.text,
        this.uploadedImagePath,
        this.topicId)
    ).subscribe(
      data => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Post added', life: 3000 });
        this.refreshPage();
      }
    )

  }
  refreshPage() {
    this.postAdded.emit();
    console.log("refreshujemy");
    this.title = '';
    this.text = '';
    this.uploadedImagePath = '';
    this.uploadedFile = '';
    this.selectedFile = new ImageSnippet('', new File([''], ''));
    this.imageInput.nativeElement.value = '';
  }
}