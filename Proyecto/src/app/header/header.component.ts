import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';

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
  profile_img;

  constructor(private auth: AuthService, private router: Router, private db: MarketPlaceDBService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized.customer = false;
        this.authorized.shop = false;
        if (this.auth.isAuthenticated()) {
          if (this.auth.isAuthenticatedClient()) {
            this.authorized.customer = true;
            this.db.findClientUserById(this.auth.getCurrentUserId()).subscribe(
              (response) => {
                if (response) {
                  if (response["user"]) {
                    this.profile_img = response["user"].profile_img;
                  }
                };
              }, (error) =>  {}
            );
          } else if (this.auth.isAuthenticatedShop()){
            this.authorized.shop = true;
            this.db.findShopUserById(this.auth.getCurrentUserId()).subscribe(
              (response) => {
                if (response) {
                  console.log(response["user"])
                  if (response["user"]) {
                    console.log(response["user"].profile_img)
                    this.profile_img = response["user"].profile_img;
                  }
                };
              }, (error) =>  {}
            );
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
      let shops: Array<number> = [];
      this.db.findAllShops().subscribe(
        (response) => {
            if (response["shops"]) {
              response["shops"].forEach((item) =>{
                if (item.name) {
                  shops.push(item.id);
                }
              });
              this.router.navigate(["/tienda/" + shops[Math.floor(Math.random()*shops.length)]])
            }
            //console.table(this.totalResults)
          });
    }

  // randomize() {
  //   let sum: number = 0;
  //   this.db.findAllShops().subscribe(
  //     (response) => {
  //         if (response["shops"]) {
  //           response["shops"].forEach((item) =>{
  //             sum++;
  //           });
  //           this.redirect(sum)
  //         }
  //         //console.table(this.totalResults)
  //       });
  // }

  // redirect(sum: number) {
  //   let num: number = Math.floor(Math.random()*sum);
  //   (num != 0) ?  this.router.navigate(["/tienda/" + num]) : this.redirect(sum);
  // }
}
