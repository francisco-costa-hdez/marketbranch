import { Component} from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';
import { PriceFilterPipe } from '../price-filter.pipe';
import { RateFilterPipe } from '../rate-filter.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  
})
export class SearchComponent {

  order = "reciente";
  title: string = "Mostrando todos los productos";
  error = false;
  loading: boolean = true;

  results = [];
  totalResults = [];
  aux = [];

  sum = 12;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  search = {"filter": '',
            "term": '',
            "type": ''};
            
  price = {min: 0,
           max: 10000};

  rate = {min: 0,
        max: 5};         
            
  constructor( private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService ) {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // console.log("end");
        this.sum = 12;
        this.totalResults = [];
        this.aux = [];
        this.search = {"filter": '',
          "term": '',
          "type": ''};
        
        this.route.queryParams.subscribe(params => {
          this.search.filter = params.filter;
          this.search.term = params.term;
        });
        
        // console.table(this.search)
        this.loading = true;
      
        switch(this.search.filter) {
          case "Producto": {
            this.search.type = this.search.filter;
            if (!this.search.term) {
              this.title = "Todos los productos";
              this.productShow();
            } else {
              this.title = "Productos relacionados con \"" + this.search.term + "\"";
              this.productSearch(this.search.term);
            }
            break;
          }
          case "Tienda": {
            this.search.type = this.search.filter;
            if (!this.search.term) {
              this.title = "Todas las tiendas";
              this.shopShow();
            } else {
              this.title = "Tiendas relacionadas con \"" + this.search.term + "\"";
              this.shopSearch(this.search.term);
            }
            break;
          }
          default: {
            this.search.type = "Producto";
            if (!this.search.term) {
              this.title = "Todos los productos";
              this.productShow();
            } else {
              this.title = "Productos relacionados con \"" + this.search.term + "\"";
              this.productSearch(this.search.term);
            }
            break;
          }
        }
      }
    });
   
  } 

  filter(array: Array<object>, min: number, max: number, type: string) {
    console.log(min, max, type)
    const filterPipe =  (type == "price" ? new PriceFilterPipe(): new RateFilterPipe());
    return filterPipe.transform(array,min, max);
  }

  initResults(array: Array<object>) {
    this.results = [];
    console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.results.push(array[i]);
    }
    // this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max)
    // this.initResults(this.totalResults)
  }

  appendItems(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalResults[i]; ++i) {
      this.results.push(this.totalResults[i]);
    }
    this.results
  }

  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 12;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  productSearch(term: string) {
    this.db.findProductsByString(term).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.loading = false;
          this.aux = [...this.totalResults];
          this.initResults(this.totalResults);
        } 
        //console.table(this.totalResults)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      });
    }
    
    productShow() {
      this.db.findAllProducts().subscribe(
        (response) => {
          if (response["products"]) {
            response["products"].forEach((item) =>{
              this.totalResults.push(item);
            });
            this.loading = false;
            this.aux = [...this.totalResults];
            this.initResults(this.totalResults);
          }
          //console.table(this.totalResults)
        },
        (error) => {
          this.error = true;
          // console.error('Request failed with error');
          // console.error(error);
        });
      }
      
      shopSearch(term: string) {
        this.db.findShopByString(term).subscribe(
          (response) => {
            if (response) {
              response["shops"].forEach((item) =>{
                this.totalResults.push(item);
              });
              this.loading = false;
              this.aux = [...this.totalResults];
              this.initResults(this.totalResults);
            }
            // console.table(this.totalResults);
            // console.log(this.search.type)
          },
          (error) => {
            this.error = true;
            // console.error('Request failed with error');
            // console.error(error);
          });
        }
        
        shopShow() {
          this.db.findAllShops().subscribe(
            (response) => {
              if (response) {
                response["shops"].forEach((item) =>{
                  this.totalResults.push(item);
                });
                this.loading = false;
                this.aux = [...this.totalResults];
                this.initResults(this.totalResults);
              }
              //console.table(this.totalResults)
            },
            (error) => {
          this.error = true;
          // console.error('Request failed with error');
          // console.error(error);
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
  
  updatePriceFilter(price) {
    if (this.price.max != price.max || this.price.min != price.min) {
      this.price.max = Number(price.max);
      this.price.min = Number(price.min);
      this.orderResults();
      this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max, "price")
      console.table(this.totalResults)
      console.table(this.results)
      this.initResults(this.totalResults)
      console.table(this.results)
    }
  }

  updateRateFilter(rate) {
    if (this.rate.max != rate.max || this.rate.min != rate.min) {
      this.rate.max = Number(rate.max);
      this.rate.min = Number(rate.min);
      this.orderResults();
      this.totalResults = this.filter(this.totalResults, this.rate.min, this.rate.max, "rate")
      console.table(this.totalResults)
      console.table(this.results)
      this.initResults(this.totalResults)
      console.table(this.results)
    }
  }

}
