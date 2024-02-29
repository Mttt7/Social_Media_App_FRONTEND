import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  notificationsNumber: number = 4;

  items: MenuItem[] = []
  activeItem: MenuItem = this.items[0];


  constructor(private authService: AuthService, private router: Router, private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {



    this.items = [
      { label: 'Home', icon: 'fa-solid fa-house', command: () => this.router.navigateByUrl('/home/feed') },
      { label: 'Friends Activity', icon: 'fa-solid fa-user-group', command: () => this.router.navigateByUrl('/home/friends') },
      {
        label: 'My Profile', icon: 'fa-solid fa-user', command: () => {
          this.userService.getUserId()?.subscribe((data) => {
            this.router.navigateByUrl('/users/' + data);
          })

        }
      },
      { label: 'Settings', icon: 'fa-solid fa-gear', command: () => this.router.navigateByUrl('/settings') },
      {
        label: 'Notifications', icon: 'class="fa-solid fa-bell', badge: this.notificationsNumber.toString(), command: () => {
          this.router.navigateByUrl('/notifications');
        }
      },
      {
        label: 'Logout', icon: 'fa-solid fa-right-from-bracket', command: () => {
          this.authService.logout();
          this.router.navigateByUrl('/login');
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

        if (event.urlAfterRedirects === '/home') {
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
}
