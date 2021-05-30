import { Component} from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { CategoryListService } from '../category-list.service';
import { PriceFilterPipe } from '../price-filter.pipe';
import { RateFilterPipe } from '../rate-filter.pipe';
import { SubcategoryFilterPipe } from '../subcategory-filter.pipe';

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
  categoryId: number;

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
  
  subcategories = [];
            
  constructor( private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService, private categoryList: CategoryListService) {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // console.log("end");
        this.loading = true;
        this.error = false;
        this.sum = 12;
        this.results = [];
        this.totalResults = [];
        this.aux = [];
        this.categoryId = 0;
        this.search = {"filter": '',
          "term": '',
          "type": ''};
        this.route.queryParams.subscribe(params => {
            this.search.filter = params.filter;
            this.search.term = params.term;
        });
        
        // console.table(this.search)

        if (this.search.filter == "Producto") {
          this.choseProduct();
        } else if (this.search.filter == "Tienda") {
          this.choseShop();
        } else if (this.search.filter != undefined) {
          if (!(this.categoryList.getCategories).length) {
            this.db.findAllCategories().subscribe(
            (response) => {
              let categories = []
              if (response["categories"]) {
                response["categories"].forEach((item) =>{
                  categories.push(item);
                });
                this.categoryList.setCategoriesFromArray(categories);
                this.choseCategory();
              }
            },
            (error) => {
              console.error('Request failed with error');
              console.error(error);
            });
          } else {
            this.choseCategory();
          }
        } else {
          this.choseProduct();
        }
      }
    }); 
  } 

  choseShop() {
    this.search.type = this.search.filter;
    if (!this.search.term) {
      this.title = "Todas las tiendas";
      this.showShops();
    } else {
      this.title = "Tiendas relacionadas con \"" + this.search.term + "\"";
      this.searchShop(this.search.term);
    }
  }

  choseProduct() {
    this.search.type = "Producto";
    if (!this.search.term) {
      this.title = "Todos los productos";
      this.showProducts();
    } else {
      this.title = "Productos relacionados con \"" + this.search.term + "\"";
      this.searchProduct(this.search.term);
    }
  }

  choseCategory() {
    this.search.type = "Producto";
    this.categoryId = this.categoryList.getCategoryId(this.search.filter);
    if (this.categoryId) {
      if (!this.search.term) {
        this.title = "Todos los productos en " + this.search.filter;
        this.showByCategory(this.categoryId);
      } else {
        this.title = "Productos relacionados con \"" + this.search.term + "\" en " + this.search.filter;
        this.searchByCategory(this.categoryId, this.search.term);
      }
    } else {
      this.choseProduct();
    }
  }

  filterByNumbers(array: Array<object>, min: number, max: number, type: string) {
    const filterPipe =  (type == "price" ? new PriceFilterPipe(): new RateFilterPipe());
    return filterPipe.transform(array,min, max);
  }


  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 12;
    this.resultsAppend(start, this.sum);
    this.direction = "down";
  }

  resultsAppend(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalResults[i]; ++i) {
      this.results.push(this.totalResults[i]);
    }
    this.results
  }

  resultsInit(array: Array<object>) {
    this.results = [];
    // console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.results.push(array[i]);
    }
    // this.totalResults = this.filter(this.totalResults, this.price.min, this.price.max)
    // this.resultsInit(this.totalResults)
  }

  resultsOrder(order = null) {
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
          console.log(a)
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
    this.resultsInit(this.totalResults);
  }

  searchByCategory(category_id, term: string) {
    console.log(category_id + " " + term + " " + this.search.filter);
    this.db.findProductsByCategoryAndName(category_id, term).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.aux = [...this.totalResults];
          this.resultsInit(this.totalResults);
          this.loading = false;
        }
        //console.table(this.totalResults)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

  searchProduct(term: string) {
    this.db.findProductsByString(term).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.aux = [...this.totalResults];
          this.resultsInit(this.totalResults);
          this.loading = false;
        } 
        //console.table(this.totalResults)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }
    
  searchShop(term: string) {
    this.db.findShopByString(term).subscribe(
      (response) => {
        if (response) {
          response["shops"].forEach((item) =>{
            this.totalResults.push(item);
          });
          for(let i = 0, j = 0; i < this.totalResults.length; i++){
            if (this.totalResults[i].name != null) {
              this.aux[j] = this.totalResults[i];
              j++
            }
          }
          this.totalResults = [...this.aux];
          this.resultsInit(this.totalResults);
          this.loading = false;
        }
        // console.table(this.totalResults);
        // console.log(this.search.type)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

  showByCategory(category_id) {
    console.log(category_id + " " + this.search.filter);
    this.db.findProductsByCategory(category_id).subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.aux = [...this.totalResults];
          this.resultsInit(this.totalResults);
          this.loading = false;
        }
        //console.table(this.totalResults)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

  showProducts() {
    this.db.findAllProducts().subscribe(
      (response) => {
        if (response["products"]) {
          response["products"].forEach((item) =>{
            this.totalResults.push(item);
          });
          this.aux = [...this.totalResults];
          this.resultsInit(this.totalResults);
          this.loading = false;
        }
        //console.table(this.totalResults)
      },
      (error) => {
        this.error = true;
        // console.error('Request failed with error');
        // console.error(error);
      }
    );
  }

  showShops() {
    this.db.findAllShops().subscribe(
      (response) => {
          if (response) {
            response["shops"].forEach((item) =>{
              this.totalResults.push(item);
            });
            for(let i = 0, j = 0; i < this.totalResults.length; i++){
              if (this.totalResults[i].name != null) {
                this.aux[j] = this.totalResults[i];
                j++
              }
            }
            this.totalResults = [...this.aux];
            this.resultsInit(this.totalResults);
            this.loading = false;
          }
          //console.table(this.totalResults)
        },
        (error) => {
      this.error = true;
      // console.error('Request failed with error');
      // console.error(error);
      }
    );
  }
  
  updatePriceFilter(price) {
    if (this.price.max != price.max || this.price.min != price.min) {
      this.price.max = Number(price.max);
      this.price.min = Number(price.min);
      this.resultsOrder();
      this.totalResults = this.filterByNumbers(this.totalResults, this.price.min, this.price.max, "price")
      this.resultsInit(this.totalResults)
    }
  }

  updateRateFilter(rate) {
    if (this.rate.max != rate.max || this.rate.min != rate.min) {
      this.rate.max = Number(rate.max);
      this.rate.min = Number(rate.min);
      this.resultsOrder();
      this.totalResults = this.filterByNumbers(this.totalResults, this.rate.min, this.rate.max, "rate")
      this.resultsInit(this.totalResults)
    }
  }

  updateSubcategoryFilter(subcategories) {
    const SubcategoryFilter = new SubcategoryFilterPipe();
    this.subcategories = [];

    subcategories.forEach(subcategory => {
      if (subcategory.Value == true) {
        this.subcategories.push(subcategory.id);
      }
    });

    this.resultsOrder();
    if (this.subcategories.length) {
      this.totalResults = SubcategoryFilter.transform(this.totalResults, this.subcategories);
    } else {
      this.totalResults = [];
    }
    this.resultsInit(this.totalResults)
  }

}
