import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product;

  constructor(private cartList: CartService) { }

  ngOnInit(): void { }

  deleteProduct() {
    this.cartList.deleteFromCartList(this.product.id);
  }

  updateQuantity() {
    console.log(this.product.quantity)
    if (this.product.quantity < 1 ) {
      this.product.quantity = 1;
    } else if (this.product.quantity > 250) {
      this.product.quantity = 250;
    }

    this.cartList.updateQuantity(this.product.quantity, this.product.id)
  }

}
