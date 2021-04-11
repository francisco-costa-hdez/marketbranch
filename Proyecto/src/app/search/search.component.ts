import { Component } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  
})
export class SearchComponent {


  initResults(array: Array<object>) {
    this.results = []
    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.results.push(array[i]);
    }
  }

  addItems(startIndex, endIndex) {
    for (let i = startIndex; i < this.sum && this.totalResults[i]; ++i) {
      this.results.push(this.totalResults[i]);
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown() {
    //console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 12;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  title: string = "Mostrando todos los productos";
  error = false;
  results = [];
  totalResults = [];
  aux = [];
  loading: boolean = true;

  sum = 12;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";

  search = {"filter": '',
            "term": '',
            "type": ''};
            
  price = {min: 0,
           max: 10000};
   
  rate = {min: 0,
          max: 5};         
            
  constructor(  private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService ) {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // console.log("end");

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

  productSearch(term: string) {
    this.db.findProductsByString(term).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.totalResults.forEach((item) => {
          })
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
      
  orderResults(order) {
    //console.log("order :" + order.value);
    this.totalResults = [...this.aux];
    switch (order.value) {
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
        order.value="reciente"
        break;
      }
    }
    this.initResults(this.totalResults);
  }
  
  updatePriceFilter(price) {
    this.price = price;
  }

  updateRateFilter(rate) {
    this.rate = rate;
  }

}
