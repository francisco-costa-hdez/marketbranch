import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild('minPricing') minPricing: ElementRef<HTMLInputElement>;
  @ViewChild('maxPricing') maxPricing: ElementRef<HTMLInputElement>;

  @ViewChild('maxRating') minRating: ElementRef<HTMLInputElement>;
  @ViewChild('maxRating') maxRating: ElementRef<HTMLInputElement>;

  minPrice: number = 0;
  maxPrice: number = 10000;
  
  minRate: number = 0;
  maxRate: number = 5;
  
  sliderOptions: Options = {
    floor: 0,
    ceil: 10000
  };
  
  title: string = "Mostrando todos los productos";
  error = false;
  results = [];
  aux = [];
  loading: boolean = true;

  search = {"filter": '',
            "term": '',
            "type": ''};
            
            
            
  constructor(  private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService ) {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //console.log("end");

        this.results = [];
        this.aux = [];
        this.search = {"filter": '',
          "term": '',
          "type": ''};
        
        this.route.queryParams.subscribe(params => {
          this.search.filter = params.filter;
          this.search.term = params.term;
        });
        
        // console.log("obtengo:");
        console.table(this.search)
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

  ngAfterViewInit(): void {
   this.updatePrice(this.minPricing.nativeElement, this.maxPricing.nativeElement)
   this.updateRate(this.minRating.nativeElement, this.maxRating.nativeElement)

  }

  updatePrice(minInput, maxInput) {
    minInput.value = this.minPrice;
    maxInput.value = this.maxPrice;
  }

  updateRate(minInput, maxInput) {
    minInput.value = this.minRate;
    maxInput.value = this.maxRate;
  }

  updateMinPrice(newValue) {
    this.minPrice = newValue;
  }
  
  updateMinRate(newValue) {
    this.minRate = newValue;
  }

  updateMaxPrice(newValue) {
    this.maxPrice = newValue;
  }

  updateMaxRate(newValue) {
    this.maxRate = newValue;
  }
  
  productSearch(term: string) {
    console.log("busco el producto: " + term)
    this.db.findProductsByString(term).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.results.push(item);
          });
          this.results.forEach((item) => {
          })
          this.loading = false;
          this.aux = [...this.results];
        } 
        //console.table(this.results)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      });
    }
    
    productShow() {
      console.log("veo todos los productos")
      this.db.findAllProducts().subscribe(
        (response) => {
          if (response["products"]) {
            response["products"].forEach((item) =>{
              this.results.push(item);
            });
            this.loading = false;
            this.aux = [...this.results];
          }
          //console.table(this.results)
        },
        (error) => {
          this.error = true;
          // console.error('Request failed with error');
          // console.error(error);
        });
    }
      
    shopSearch(term: string) {
      console.log("busco la tienda: " + term)
      this.db.findShopByString(term).subscribe(
        (response) => {
          if (response) {
            response["shops"].forEach((item) =>{
              this.results.push(item);
            });
            this.loading = false;
            this.aux = [...this.results];
          }
          // console.table(this.results);
          // console.log(this.search.type)
        },
        (error) => {
          this.error = true;
          // console.error('Request failed with error');
          // console.error(error);
        });
    }
    
    shopShow() {
      console.log("veo todas las tiendas")
      this.db.findAllShops().subscribe(
        (response) => {
          if (response) {
            response["shops"].forEach((item) =>{
            this.results.push(item);
          });
          this.loading = false;
          this.aux = [...this.results];
          }
          //console.table(this.results)
        },
        (error) => {
          this.error = true;
          // console.error('Request failed with error');
          // console.error(error);
        });
  }

  orderResults(order) {
    //console.log("order :" + order.value);
    this.results = [...this.aux];
    switch (order.value) {
      case "reciente": {
        break;
      };
      case "antiguo": {
        this.results.reverse();
        break;
      };
      case "mejor": {
        this.results.sort(function(a, b){
          return b.price - a.price;
        });
        break;
      };
      case "peor": {
        this.results.sort(function(a, b){
          return a.price - b.price;
        });
        break;
      };
      default: {
        order.value="reciente"
        break;
      }
    }
  }

}
