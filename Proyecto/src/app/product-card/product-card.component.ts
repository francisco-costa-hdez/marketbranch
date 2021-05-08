import { Component, Input, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  constructor(private db: MarketPlaceDBService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log(this.product.id)
    console.log(this.auth.getCurrentUserId())
    if (this.auth.isAuthenticated()) {
      this.addToDB(this.product.id, this.auth.getCurrentUserId());
    } else {
      console.log("inicia sesión");
    }
  }

  addToDB(productId: number, userId: number) {
    this.db.addToCart(productId, userId).subscribe(
      (response) => {
        if (response) {
          console.log(response)
        } else {
          console.log("no response")
        }
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      }
    );
  }
}
