import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authorized: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized = false;
        if (this.auth.isAuthenticated()) {
          this.authorized = true;
        }
      }
    });
  }

  ngOnInit(): void {
  }

  logout() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }

}
