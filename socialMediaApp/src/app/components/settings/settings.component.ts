import { Component, ElementRef, ViewChild } from '@angular/core';
import { FriendshipService } from '../../services/friendship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post-service.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserProfile } from '../../models/UserProfile';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  user!: UserProfile;
  firstName!: string;
  lastName!: string;
  username!: string;
  bio!: string

  uploadedFile: any;
  selectedFile!: ImageSnippet;
  uploadedProfilePhoto: string = '';
  uploadedBackgroundPhoto: string = '';

  @ViewChild('profileImage') profileImage!: ElementRef;
  @ViewChild('backgroundImage') backgroundImage!: ElementRef;

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService,
    private router: Router, private store: AngularFireStorage,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUserId().pipe(
      switchMap(id => this.userService.getUserProfileById(id))
    ).subscribe(user => {
      this.user = user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = '@' + user.username;
      this.bio = user.about;
    })
  }

  onUpload(imageInput: any, type: string) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      let fileName = this.getFileName(type)
      this.store.upload(fileName, this.selectedFile.file).then((res) => {
        if (type === "profilePhoto") {
          res.ref.getDownloadURL().then((url) => {
            this.uploadedProfilePhoto = url;
          })
        }
        else if (type === "backgroundPhoto") {
          res.ref.getDownloadURL().then((url) => {
            this.uploadedBackgroundPhoto = url;
          })

        }
      })

    })
    reader.readAsDataURL(file);
  }

  submit(type: string) {

    if (type === "profilePhoto") {
      this.userService.updateUserProfile({ photoUrl: this.uploadedProfilePhoto }).subscribe(() => {
        this.getUser();
      })
    }
    else if (type === "backgroundPhoto") {
      this.userService.updateUserProfile({ backgroundUrl: this.uploadedBackgroundPhoto }).subscribe(() => {
        this.getUser();
      })
    }
    else if (type === "name") {
      this.userService.updateUserProfile({ firstName: this.firstName, lastName: this.lastName, about: this.bio }).subscribe(() => {
        this.getUser();
      })
    }

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated', life: 3000 });
  }




  getFileName(type: string): string {
    if (type === 'profilePhoto') {
      return 'images/' + this.user.username + '/profilePhotos/' + Math.floor(Math.random() * (99999 - 99 + 1)) + 99
    } else {
      return 'images/' + this.user.username + '/backgroundPhotos/' + Math.floor(Math.random() * (99999 - 99 + 1)) + 99
    }


  }
}
