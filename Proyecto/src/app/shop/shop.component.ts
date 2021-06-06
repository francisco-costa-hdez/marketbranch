import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shop;
  results = [];
  totalResults;
  aux;
  best = [];
  shop_rating: number;

  order = "reciente";
  sum = 6;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  loading: boolean = true;
  loadingProducts: boolean = true;
  show: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.shop;
        this.results = [];
        this.totalResults;
        this.aux;
        this.best = [];
        this.shop_rating;

        this.sum = 6;
        this.scrollDistance = 1;

        this.loading = true;
        this.loadingProducts = true;
        this.show = false;
        this.getShop(this.route.snapshot.paramMap.get('id'));
      }
    })
  }

  ngOnInit(): void {}

  initResults(array: Array<object>) {
    this.results = [];
    // console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.results.push(array[i]);
    }
    // console.table(this.results);
    // this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max)
    // this.initResults(this.totalResults)
  }

  appendItems(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalResults[i] != null; ++i) {
      this.results.push(this.totalResults[i]);
    }
    this.results
  }

  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 6;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  chosePrincipal() {
    alert("esto quiero hacerlo con los datos devueltos de la api pa no trabajar doble:)");
  }

  toggleGallery(state:boolean) {
    this.show = state;
  }

  getShop(id: string | number) {
    this.db.findShopById(id).subscribe(
      (response) => {
        if (response) {
          this.shop = response["shop"];
          this.loading = false;
          //console.log(this.shop)
          if (this.shop) {
            this.getProducts(id);
          }
        };
      }, (error) =>  {});
      
  }

  getProducts(id) {
    this.db.findProductByShop(id).subscribe(
      (response) => {
        this.totalResults = [];
        this.aux = [];
        if (response["products"]) {
          response["products"].forEach((item) => {
            this.totalResults.push(item);
          });
          this.aux = [...this.totalResults];
          //console.table(this.totalResults);
          //console.table(this.aux);
          this.aux.sort(function(a, b){
            return b.media_rating - a.media_rating;
          });
          for(let i = 0; i <= 11; i++) {
            if (i < this.aux.length) {
              this.best[i] = this.aux[i];
            }
          }
          this.aux = [...this.totalResults];
          this.initResults(this.totalResults);
          this.loadingProducts = false;
          let num_ratings: number = 0;
          let sum_ratings: number = 0
          this.aux.forEach( (product) => {
            if (parseFloat(product.media_rating) > 0) {
              num_ratings++;
              sum_ratings = sum_ratings + parseFloat(product.media_rating);
            }
          })
          this.shop_rating = sum_ratings / num_ratings;
          // console.log(this.shop_rating)
          // console.table(this.results)
          //console.table(this.aux)
          //console.table(this.best
        }
        //console.table(this.totalResults)
      }
    );
  }

  orderResults(order = null) {
    //console.log("order :" + order.value);
    this.totalResults = [...this.aux];
    if (order != null && this.order != order.value) {
      this.order = order.value;
    }
    switch (this.order) {
      case "reciente": {
        break;
      };
      case "antiguo": {
        this.totalResults.reverse();
        break;
      };
      case "mejor": {
        this.totalResults.sort(function(a, b){
          return b.media_rating - a.media_rating;
        });
        break;
      };
      case "peor": {
        this.totalResults.sort(function(a, b){
          return a.media_rating - b.media_rating;
        });
        break;
      };
      default: {
        order.value = "reciente";
        break;
      }
    }
    this.initResults(this.totalResults);
  }
}
