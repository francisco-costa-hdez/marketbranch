import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketPlaceDBService } from 'src/market-place-db.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private db: MarketPlaceDBService) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.paramMap.get('id'));
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
