import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {



  notifications!: Notification[];
  pageNumber = 0;
  noMoreNotifications = false;

  constructor(private notificationService: NotificationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.pageNumber = 0;
    this.getNotifications();
  }

  getNotifications(loadmore = false): void {
    this.notificationService.getNotifications(this.pageNumber, 10).subscribe(data => {
      if (loadmore) {
        this.notifications = this.notifications.concat(data.content);
      } else {
        this.notifications = data.content;
      }
      if (data.last) {
        this.noMoreNotifications = true;
      }
    });
  }

  loadMore() {
    this.pageNumber++;
    this.getNotifications(true);
  }



  getTime(notification: Notification): string {
    const createdAt = new Date(notification.createdAt);
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime.getTime() - createdAt.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) {
      return `${elapsedDays} day(s) ago`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours} hour(s) ago`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minute(s) ago`;
    } else {
      return `${elapsedSeconds} second(s) ago`;
    }
  }

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification.id).subscribe(() => {
      this.getNotifications();
      if (notification.type == "sentFriendRequest" || notification.type == "acceptedFriendRequest") {
        this.router.navigate(['/users/', notification.contentId]);
      } else {
        this.router.navigate(['/posts/', notification.contentId]);
      }

    });

  }
}
