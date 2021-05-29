import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authorized = {
    customer: false,
    shop: false
  }
  authClient: boolean = false;
  random: number;

  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized.customer = false;
        this.authorized.shop = false;
        if (this.auth.isAuthenticated()) {
          if (this.auth.isAuthenticatedClient()) {
            this.authorized.customer = true;
          } else if (this.auth.isAuthenticatedShop()){
            this.authorized.shop = true;
          }
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
  
  randomize() {
    this.random = Math.floor(Math.random()*101);
    this.router.navigate(["/producto/" + this.random]);
  }

}
