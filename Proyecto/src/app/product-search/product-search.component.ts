import { Component, OnInit } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products = [];
  loading: boolean = true;
  term: string;

  minPrice: number = 0;
  maxPrice: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500
  };

  constructor(  private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService ) { }

  ngOnInit(): void {
    this.term = this.route.snapshot.paramMap.get('term');
    this.getSearch(this.term);
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

  getSearch(term: string) {
    console.log("busco: " + term)
    this.db.findProductsByString(term).subscribe(
      (response) => {
        this.products = [];
        if (response["products"]) {
          response["products"].forEach((item) =>{
            let newProduct = item;
            this.products.push(newProduct);
          });
          // response.forEach((item) => {
          //   let nuevoResultado = {
          //     id: item.id,
          //     name: item.name,
          //     price: item.price,
          //     discount: item.discount,
          //     shop_id: item.shop_id,
          //     media_rating: item.media_rating
          //   };
          //   this.products.push(nuevoResultado);
          // });
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
