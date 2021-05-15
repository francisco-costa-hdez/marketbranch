import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
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
  loading: boolean = true;
  show: boolean = false;

  constructor(private auth: AuthService, private cart: CartService, private route: ActivatedRoute, private db: MarketPlaceDBService) { }

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
          console.log(this.product)
          this.getCategorization(this.product.subcategory_id)
          this.getShop(this.product.shop_id) 
      }},
      (error) =>  {});
  }

  getCategorization(subcategory_id: string | number) {
    this.db.findCategoryBysubCategoryId(subcategory_id).subscribe(
      (response) => {
        if (response["category"]) {
          this.categorization = response["category"][0];
          this.loading = false;
          console.log(this.categorization)
         
      }},
      (error) =>  {});
  }

  getShop(shop_id: string | number) {
    console.log("here");
    this.db.findShopByProduct(shop_id).subscribe(
      (response) => {
        if (response) {
          this.shop = response["shop"];
          this.loading = false;
          console.log(this.shop)
         
      }},
      (error) =>  {});
  }

}
