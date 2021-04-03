import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceDBService {

  private url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  //Get all the products in the database
  getAllProducts() {
    return this.http.get( this.url + "/products")
  }
  //Get a product with detailed info
  getProduct(product_id: string | number) {
    return this.http.get( this.url + "/products/" + product_id)
  }
  //Get all the products from an especific shop
  getProductsByShop(shop_id: string | number) {
    return this.http.get( this.url + "/products/shop/" + shop_id)
  }
  
  //Get all the products from an especific subcategory
  getProductsBySubcategory(subcategory_id: string | number) {
    return this.http.get( this.url + "/products/subcategory/" + subcategory_id)
  }
  
  //Get all the products from an especific category
  getProductsByCategory(category_id: string | number) {
    return this.http.get( this.url + "/products/category/" + category_id)
  }
  
  //Get all the products a with coincidence with a pattern in name or description
  getProductsByString(search_term: string) {
    return this.http.get( this.url + "/products/str/" + search_term)
  }
  
  //Get all the shops in the database
  getShops() {
    return this.http.get( this.url + "/shops")
  }
  
  //Get all the shops with a coincidence with a pattern in name or description
  getShopBySearch(search_term: string) {
    return this.http.get( this.url + "/shops/" + search_term)
  }

  
}
