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
  images;
  shop = {id: "", name: "", image: ""};
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
  customer: boolean = false;

  vote: Array<number> = [0,0,0,0,0];

  constructor(private auth: AuthService, private cart: CartService, private router: Router, private route: ActivatedRoute, private db: MarketPlaceDBService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.product = null;
        this.images = [];
        this.shop = {id: "", name: "", image: ""};
        this.categorization = null;
        this.reviews = [];
        this.auxReviews = [];
        this.totalReviews = [];
        this.sum = 3;

        this.loading = true;
        this.show = false;
        this.getProduct(this.route.snapshot.paramMap.get('id'));
      }
    });
  }

  ngOnInit(): void {
    this.customer = false;
    if (this.auth.isAuthenticatedClient()) {
      this.customer = true;
    }
  }

  addToCart() {
    if (this.auth.isAuthenticatedClient()) {
      this.cart.addToCartList(this.product.id)
    } else {
      alert("Para comprar en Acho Market debes iniciar sesión");
    }
  }

  addReview(review) {
    this.auxReviews.push(review);
    this.orderReviews();
  }

  toggleGallery(state:boolean) {
    this.show = state;
  }

  getProduct(id: string | number) {
    this.db.findProductById(id).subscribe(
      (response) => {
        if (response["product"]) {
          this.product = response["product"][0];
          if (response["images"]) {
            response["images"].forEach( (image) => {
              this.images.push(image.image);
            })
          }
          if (this.product) {
            this.product.description = this.product.description.replace(/\r?\n/g, '<br>');
            this.getCategorization(this.product.subcategory_id);
            this.getShop(this.product.shop_id);
            this.getReviews(id);
          } else {
            this.loading = false;
          }
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
        // console.log(response)
        if (response) {
          this.shop.id = (response["shop"].id) ? (response["shop"].id) : null;
          this.shop.name = (response["shop"].name) ? (response["shop"].name) : null;
          this.shop.image = (response["images"][0]) ? (response["images"][0].image) : null;
          this.loading = false;
          // console.log(this.shop)
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
          }
        );
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
