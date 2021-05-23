import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  authorized: boolean = false;
  cart: Array<any> = [];
  price: number = 0;

  constructor(private auth: AuthService, private db: MarketPlaceDBService, private router:Router, private cartList: CartService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.authorized = false;
        if (this.auth.isAuthenticatedClient()) {
          this.authorized = true;
          this.getCart();
        }
      }
    });
  }

  ngOnInit(): void {
    this.cartList.cartUpdated.subscribe(
      (cartList) => {
        this.getCart();
      }
    )
  }

  getCart() {
    this.cart = this.cartList.getCartList();
    this.updatePrice();
  }

  updatePrice() {
    this.price = 0;
    this.cart.forEach( (item) => {
      this.price = this.price +(item.price * item.quantity);
    })
  }

}
