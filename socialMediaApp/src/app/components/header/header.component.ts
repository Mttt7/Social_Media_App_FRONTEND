import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { filter } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  notificationsNumber: number = 0;

  items: MenuItem[] = []
  activeItem: MenuItem = this.items[-1];


  constructor(private authService: AuthService, private router: Router, private userService: UserService,
    private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit() {
    setTimeout(() => {
      this.updateNotificationsNumber();
    }, 1000);

    this.items = [
      {
        label: 'Home', icon: 'fa-solid fa-house', command: () => {
          this.router.navigateByUrl('/home/feed')
          this.updateNotificationsNumber();
        }
      },
      {
        label: 'Friends Activity', icon: 'fa-solid fa-user-group', command: () => {
          this.router.navigateByUrl('/home/friends')
          this.updateNotificationsNumber();
        }
      },
      {
        label: 'My Profile', icon: 'fa-solid fa-user', command: () => {
          this.userService.getUserId()?.subscribe((data) => {
            this.router.navigateByUrl('/users/' + data);
          })
          this.updateNotificationsNumber();
        }
      },
      {
        label: 'Settings', icon: 'fa-solid fa-gear', command: () => {
          this.router.navigateByUrl('/settings')
          this.updateNotificationsNumber();
        }
      },
      {
        label: 'Notifications', icon: 'class="fa-solid fa-bell', badge: this.notificationsNumber.toString(), command: () => {
          this.router.navigateByUrl('/notifications');
          this.updateNotificationsNumber();
        }
      },
      {
        label: 'Logout', icon: 'fa-solid fa-right-from-bracket', command: () => {
          this.authService.logout();
          this.router.navigateByUrl('/login');
          this.updateNotificationsNumber();
        }
      }
    ];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.urlAfterRedirects === '/login' && event.urlAfterRedirects === '/register') {
        return;
      }
      this.userService.getUserId()?.subscribe((userId) => {
        if (event.urlAfterRedirects === '/home/feed') {
          this.activeItem = this.items[0];
        } else if (event.urlAfterRedirects === '/home/friends') {
          this.activeItem = this.items[1];
        } else if (event.urlAfterRedirects.startsWith('/users')
          && event.urlAfterRedirects === '/users/' + userId) {
          this.activeItem = this.items[2];
        } else if (event.urlAfterRedirects.startsWith('/users')
          && event.urlAfterRedirects !== '/users/' + userId) {
          this.activeItem = this.items[-1]
        } else if (event.urlAfterRedirects === '/settings') {
          this.activeItem = this.items[3];
        } else if (event.urlAfterRedirects === '/notifications') {
          this.activeItem = this.items[4];
        }
        else if (event.urlAfterRedirects === '/login') {
          this.activeItem = this.items[5];
        }
      })
    });



  }

  updateNotificationsNumber() {
    this.notificationService.countNotReadNotifications().subscribe((data) => {
      this.notificationsNumber = data.count;
      this.items[4].badge = data.count.toString();
      this.items = [...this.items];
    });
  }
}
