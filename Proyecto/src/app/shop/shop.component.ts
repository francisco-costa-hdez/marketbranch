import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

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

  order = "reciente";
  sum = 6;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  loading: boolean = true;
  show: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    this.getShop(this.route.snapshot.paramMap.get('id'));
  }

  initResults(array: Array<object>) {
    this.results = [];
    console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.results.push(array[i]);
    }
    console.table(this.results);
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
            return b.price - a.price;
          });
          for(let i = 0; i <= 11; i++) {
            if (i < this.aux.length) {
              this.best[i] = this.aux[i];
            }
          }
          this.aux = [...this.totalResults];
          this.initResults(this.totalResults);
          // console.table(this.results)
          //console.table(this.aux)
          //console.table(this.best
        }
        //console.table(this.totalResults)
      },
      (error) => {
        console.error('Request failed with error');
        console.error(error);
      });
  
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
          return b.price - a.price;
        });
        break;
      };
      case "peor": {
        this.totalResults.sort(function(a, b){
          return a.price - b.price;
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
