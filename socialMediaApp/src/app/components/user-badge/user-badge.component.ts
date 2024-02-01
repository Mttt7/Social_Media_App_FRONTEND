import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/UserProfile';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrl: './user-badge.component.scss'
})
export class UserBadgeComponent implements OnInit {
  @Input() userId!: number;
  user: UserProfile = new UserProfile(0, '', '', '', '', '', '', '', '', new Date());

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfileById(this.userId).subscribe(
      data => {
        this.user = data;
      }
    )
  }
}
