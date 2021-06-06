import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';
import { ProfileImageService } from '../profile-image.service';

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
  shop_id;

  constructor(private auth: AuthService, private router: Router, private db: MarketPlaceDBService, private img: ProfileImageService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized.customer = false;
        this.authorized.shop = false;
        if (this.auth.isAuthenticated()) {
          if (this.auth.isAuthenticatedClient()) {
            this.authorized.customer = true;
           
          } else if (this.auth.isAuthenticatedShop()){
            this.authorized.shop = true;
            this.shop_id = this.auth.getCurrentUserShop();
            
          }
          if (this.img.getImage()) {
            this.profile_img = this.img.getImage();
          } else {
            if (this.authorized.customer) {
              this.db.findClientUserById(this.auth.getCurrentUserId()).subscribe(
                (response) => {
                  if (response && response["user"]) {
                    this.profile_img = response["user"].profile_img;
                  }
                }
              );
            } else if (this.authorized.shop) {
              this.db.findShopUserById(this.auth.getCurrentUserId()).subscribe(
                (response) => {
                  if (response && response["user"]) {
                    this.profile_img = response["user"][0].profile_img;
                  }
                }
              );
            }
            this.img.setImage(this.profile_img);
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
