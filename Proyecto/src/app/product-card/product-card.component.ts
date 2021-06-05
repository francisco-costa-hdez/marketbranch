import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  img: string;
  img2: string;
  customer: boolean = false;

  constructor(private auth: AuthService, private cart: CartService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.customer = false;
        if (this.auth.isAuthenticatedClient()) {
          this.customer = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.customer = false;
    if (this.auth.isAuthenticatedClient()) {
      this.customer = true;
    }
    this.img = (Math.floor( Math.random() * 2)) ? "/assets/images/img-error.png" : "/assets/images/img-error2.png";
    this.img2 = (Math.floor( Math.random() * 2)) ? "/assets/images/img-error.png" : "/assets/images/img-error2.png";
  }

  addToCart() {
    if (this.auth.isAuthenticatedClient()) {
      this.cart.addToCartList(this.product.id)
    } else {
      alert("Inicia sesión");
    }
  }
}
