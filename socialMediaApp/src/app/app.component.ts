import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'socialMediaApp';
  hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.hide = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url === '/register') {
          this.hide = true;
        }
        else {
          this.hide = false;
        }
      }
    });

  }
}

