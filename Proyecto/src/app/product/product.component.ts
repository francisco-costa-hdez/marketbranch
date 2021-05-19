import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product;
  shop;
  categorization;
  reviews;
  auxReviews;
  totalReviews;

  order = "reciente";
  sum = 3;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  loading: boolean = true;
  show: boolean = false;

  vote: Array<number> = [0,0,0,0,0];

  constructor(private auth: AuthService, private cart: CartService, private router: Router, private route: ActivatedRoute, private db: MarketPlaceDBService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getProduct(this.route.snapshot.paramMap.get('id'));
      }
    });
  }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  addToCart() {
    if (this.auth.isAuthenticated()) {
      this.cart.addToCartList(this.product.id)
    } else {
      alert("Inicia sesión");
    }
  }

  chosePrincipal() {
    alert("esto quiero hacerlo con los datos devueltos de la api pa no trabajar doble:)");
  }

  toggleGallery(state:boolean) {
    this.show = state;
  }

  getProduct(id: string | number) {
    this.db.findProductById(id).subscribe(
      (response) => {
        if (response["product"]) {
          this.product = response["product"][0];
          // console.log(this.product);
          this.getCategorization(this.product.subcategory_id);
          this.getShop(this.product.shop_id);
          this.getReviews(id);
        }
      },
      (error) =>  {});
  }

  getCategorization(subcategory_id: string | number) {
    this.db.findCategoryBysubCategoryId(subcategory_id).subscribe(
      (response) => {
        if (response["category"]) {
          this.categorization = response["category"][0];
          this.loading = false;
          // console.log(this.categorization);  
        }
      },
      (error) =>  {});
  }

  getShop(shop_id: string | number) {
    this.db.findShopById(shop_id).subscribe(
      (response) => {
        if (response) {
          this.shop = response["shop"];
          this.loading = false;
          // console.log(this.shop);    
        }
      },
      (error) =>  {});
  }

  getReviews(product_id) {
    this.totalReviews = [];
    this.db.getAllProductReviews(product_id).subscribe(
      (response) => {
        if (response) {
          response["reviews"].forEach((item) => {
            this.totalReviews.push(item);
          });
          this.auxReviews = [...this.totalReviews];
          this.initReviews(this.totalReviews);
        }
      },
      (error) =>  {});
  }


  initReviews(array: Array<object>) {
    this.reviews = [];
    // console.log(this.sum);

    for (let i = 0; i < array.length && i < this.sum; i++) {
      this.reviews.push(array[i]);
    }
    // console.table(this.reviews);
  }

  appendItems(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && this.totalReviews[i] != null; ++i) {
      this.reviews.push(this.totalReviews[i]);
    }
    this.reviews
  }

  onScrollDown() {
    // console.log("scrolled down!!");
    const start = this.sum;
    this.sum += 3;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  orderReviews(order = null) {
    //console.log("order :" + order.value);
    this.totalReviews = [...this.auxReviews];
    if (order != null && this.order != order.value) {
      this.order = order.value;
    }
    switch (this.order) {
      case "reciente": {
        break;
      };
      case "antiguo": {
        this.totalReviews.reverse();
        break;
      };
      case "mejor": {
        this.totalReviews.sort(function(a, b){
          return b.rating - a.rating;
        });
        break;
      };
      case "peor": {
        this.totalReviews.sort(function(a, b){
          return a.rating - b.rating;
        });
        break;
      };
      default: {
        order.value = "reciente";
        break;
      }
    }
    this.initReviews(this.totalReviews);
  }

}
