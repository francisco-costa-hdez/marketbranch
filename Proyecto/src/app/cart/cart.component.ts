import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  authorized: boolean = false;
  cart = [];
  loading: boolean;

  constructor(private auth: AuthService, private db: MarketPlaceDBService, private router:Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized = false;
        if (this.auth.isAuthenticated()) {
          this.authorized = true;
          this.getCart();
        }
      }
    });
  }

  ngOnInit(): void {
    
  }

  getCart() {
    this.loading = true;
    this.cart = [];
    this.db.getCart(this.auth.getCurrentUserId()).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.cart.push(item);
          });
          this.loading = false;
          console.table(this.cart)
        } 
        console.log(this.cart)
      },
      (error) => {
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

}
