import { Component, Input, OnInit } from '@angular/core';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  constructor(private db: MarketPlaceDBService, private storageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log(this.product.id);
    let session = this.storageService.getCurrentToken();
    console.log(session);
    this.db.addToCart(this.product.id, 4).subscribe(
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
