import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, private cart: CartService) {
    
  }

  ngOnInit(): void {
    let hola =  Math.floor( Math.random() * 2);
    console.log(hola);
    this.img = (hola) ? "/assets/images/limon-eco.jpg" : "/assets/images/limon-eco2.jpg";
  }

  addToCart() {
    if (this.auth.isAuthenticated()) {
      this.cart.addToCartList(this.product.id)
    } else {
      alert("Inicia sesión");
    }
  }
}
