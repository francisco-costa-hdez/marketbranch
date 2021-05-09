import { Component, Input, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  constructor(private db: MarketPlaceDBService, private auth: AuthService, private cart: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    if (this.auth.isAuthenticated()) {
      this.cart.addToCartList(this.product.id)
    } else {
      alert("Inicia sesión");
    }
  }
}
