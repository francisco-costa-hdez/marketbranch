import { Component, OnInit } from '@angular/core';
import { Options} from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  title: string = "Mostrando todos los productos";
  error = false;
  results = [];
  loading: boolean = true;

  search = {"filter": '',
            "term": '',
            "type": ''};

  minPrice: number = 0;
  maxPrice: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500
  };

  constructor(  private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService ) {
    
  this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      //console.log("end");

      this.results = [];
      this.search = {"filter": '',
        "term": '',
        "type": ''};

      this.route.queryParams.subscribe(params => {
        this.search.filter = params.filter;
        this.search.term = params.term;
      });

      console.log("obtengo:");
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
          console.log("busca una tienda");
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


  ngOnInit(): void {
   
  }

  updatePrice(minInput, maxInput) {
    minInput.value = this.minPrice;
    maxInput.value = this.maxPrice;
  }

  updateMin(newValue) {
    this.minPrice = newValue;
  }
  
  updateMax(newValue) {
    this.maxPrice = newValue;
  }

  productSearch(term: string) {
    console.log("busco el producto: " + term)
    this.db.findProductsByString(term).subscribe(
      (response) => {
        this.results = [];
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.results.push(item);
          });
          this.loading = false;
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
        this.results = [];
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.results.push(item);
          });
          this.loading = false;
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
        this.results = [];
        if (response) {
          response["shops"].forEach((item) =>{
            this.results.push(item);
          });
          this.loading = false;
        }
        console.table(this.results);
        console.log(this.search.type)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      });
  }
  
  shopShow() {
    console.log("veo todos los productos")
    this.db.findAllShops().subscribe(
      (response) => {
        this.results = [];
        if (response) {
          response["shops"].forEach((item) =>{
            this.results.push(item);
          });
          this.loading = false;
        }
        //console.table(this.results)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      });
  }

}
