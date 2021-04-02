import { Component, OnInit } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  minPrice: number = 0;
  maxPrice: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500
  };

  constructor() { }

  ngOnInit(): void {
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

}
