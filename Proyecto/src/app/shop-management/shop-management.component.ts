import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MarketPlaceDBService } from '../market-place-db.service';

@Component({
  selector: 'app-shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.css']
})
export class ShopManagementComponent implements OnInit {

  products: Array<any>;
  totalProducts: Array<any>;
  sum = 5;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  constructor(private auth: AuthService, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    this.products = [];
    this.totalProducts = [];
    if (this.auth.isAuthenticatedShop()) {
      this.db.findProductByShop(this.auth.getCurrentUserShop()).subscribe(
        (response) => {
          if (response["products"]) {
            response["products"].forEach((item) => {
              this.totalProducts.push(item);
            });
            this.initResults(this.totalProducts);
          }
        },
        (error) => {
          console.error('Request failed with error');
          console.error(error);
        });
    }
  }

  initResults(array: Array<object>) {
    this.products = [];
    // console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.products.push(array[i]);
    }
    // console.table(this.results);
    // this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max)
    // this.initResults(this.totalResults)
  }

  appendItems(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalProducts[i] != null; ++i) {
      this.products.push(this.totalProducts[i]);
    }
  }

  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 6;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  logout() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }
}
