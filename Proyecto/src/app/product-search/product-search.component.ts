import { Component, OnInit } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products = [];
  loading = true;

  minPrice: number = 0;
  maxPrice: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500
  };

  constructor(  private db: MarketPlaceDBService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  updatePrice(minInput, maxInput) {
    minInput.value = this.minPrice
    maxInput.value = this.maxPrice
  }

  updateMin(newValue) {
    this.minPrice = newValue
  }
  
  updateMax(newValue) {
    this.maxPrice = newValue
  }

  getProducts() {
    this.db.getAllProducts().subscribe(
      (response) => {
        this.products = [];
        if (response["products"]) {
          response["products"].forEach((item) => {
            let nuevoResultado = {
              id: item.id,
              name: item.name,
              price: item.price,
              discount: item.discount,
              shop_id: item.shop_id,
              media_rating: item.media_rating
            };
            this.products.push(nuevoResultado);
          });
          this.loading = false;
        }
        console.table(this.products)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
    }


}
