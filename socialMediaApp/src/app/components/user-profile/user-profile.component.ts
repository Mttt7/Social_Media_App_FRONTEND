import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../../models/UserProfile';
import { UserService } from '../../services/user.service';
import { FriendshipService } from '../../services/friendship.service';
import { MenuItem } from 'primeng/api';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  userId: number = -1;
  self: boolean = false;
  selfId: number = -1;
  user: UserProfile = new UserProfile(
    -1, '', '', '', '', '', '', '', '', new Date()
  );

  editFriendshipItems: MenuItem[] = [
    {
      label: 'Remove Friend',
      icon: 'fa-solid fa-x',
      command: () => {
        this.removeFriend();
      }
    },
  ]
  respondRequestItems: MenuItem[] = [
    {
      label: 'Accept',
      icon: 'fa-solid fa-check',
      command: () => {
        this.respondToRequest(true);
      }
    },
    {
      label: 'Decline',
      icon: 'fa-solid fa-x',
      command: () => {
        this.respondToRequest(false);
      }
    }
  ]
  menuItems: MenuItem[] = [
    {
      label: 'Posts', icon: 'fa-solid fa-house', command: () => {
        this.router.navigate([], { queryParams: { tab: 'posts' } });
        this.activeMenuItem = this.menuItems[0];
      }, id: 'posts'
    },
    {
      label: 'About me', icon: 'fa-solid fa-circle-info', command: () => {
        this.router.navigate([], { queryParams: { tab: 'about' } })
        this.activeMenuItem = this.menuItems[1];
      }, id: 'about'
    },
    {
      label: 'Friends', icon: 'fa-solid fa-user-group', command: () => {
        this.router.navigate([], { queryParams: { tab: 'friends' } })
        this.activeMenuItem = this.menuItems[2];
      }, id: 'friends'
    },
  ]

  activeMenuItem: MenuItem = this.menuItems[0];

  status: string = '';

  userPosts: Post[] = [];
  pageNumber: number = 0;
  noMorePosts: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private postService: PostService,
    private friendshipService: FriendshipService, private router: Router) { }


  ngOnInit(): void {
    this.userService.getUserId().subscribe((selfId) => {

      this.route.paramMap.subscribe((params) => {

        this.userId = Number(params.get('userId'));
        this.getUserPosts();
        this.getStatus();

        this.userService.getUserProfileById(this.userId).subscribe((user) => {
          this.user = user;
          this.selfId = selfId
          if (selfId === this.userId) {
            this.self = true;
          }
        });
      })
    })
  }

  getUserPosts(loadmore: boolean = false) {
    this.postService.getUserPosts(this.userId, this.pageNumber).subscribe((data) => {

      if (loadmore) {
        this.userPosts = this.userPosts.concat(data.content);
        if (data.last) {
          this.noMorePosts = true;
        }
      }
      else {
        this.pageNumber = 0;
        this.noMorePosts = false;
        this.userPosts = data.content;
      }
    })
  }

  getStatus() {
    this.friendshipService.getStatus(this.userId).subscribe((status) => {
      this.status = status.message
    })
  }


  sendRequest() {
    this.friendshipService.sendFriendRequest(this.userId).subscribe((response) => {
      this.getStatus();
    })
  }

  respondToRequest(positive: boolean) {
    if (positive) {
      this.friendshipService.sendFriendRequest(this.userId).subscribe((response) => {
        this.getStatus();
      })
    } else {
      this.removeFriend();
    }
  }

  removeFriend() {
    this.friendshipService.removeFriendShip(this.userId).subscribe((response) => {
      this.getStatus();
    })
  }
  loadMorePosts() {
    this.pageNumber++;
    this.getUserPosts(true);
  }
}


