import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceDBService {

  private url = "http://127.0.0.1:8000/api";
  
  constructor(private http: HttpClient) { }
  
  /**********************************************************************************
   ***** Products *******************************************************************
  ***********************************************************************************/
  
  //Gets all the products in the database
  findAllProducts() {
    return this.http.get( this.url + "/products")
  }
  //Gets a product with detailed info
  findProductById(product_id: string | number) {
    return this.http.get( this.url + "/products/" + product_id)
  }
  //Gets all the products from an especific shop
  findProductByShop(shop_id: string | number) {
    return this.http.get( this.url + "/products/shop/" + shop_id)
  }

  //Gets all the products from an especific subcategory
  findProductsBySubcategory(subcategory_id: string | number) {
    return this.http.get( this.url + "/products/subcategory/" + subcategory_id)
  }

  //Gets all the products from an especific category
  findProductsByCategory(category_id: string | number) {
    return this.http.get( this.url + "/products/category/" + category_id)
  }

  //Gets all the products a with coincidence with a pattern in name or description
  findProductsByString(search_term: string) {
    return this.http.get( this.url + "/products/str/" + search_term)
  }

  //Creates a product
  createProduct() {
    return this.http.get( this.url + "/products/create/")
  }


  
  /**********************************************************************************
   ***** Shops **********************************************************************
  ***********************************************************************************/

  //Gets all the shops in the database
  findAllShops() {
    return this.http.get( this.url + "/shops")
  }

  //Gets a shop by one of its products
  findShopByProduct(product_id: string | number) {
    return this.http.get( this.url + "/shops/product/" + product_id)
  }
  
  //Gets all the shops with a coincidence with a pattern in name or description
  findShopByString(search_term: string) {
    return this.http.get( this.url + "/shops/" + search_term)
  }
 
 /**********************************************************************************
  ***** Categories *****************************************************************
 ***********************************************************************************/
  
  //Gets all the shops in the database
  findAllCategories() {
    return this.http.get( this.url + "/categories")
  }

  //Gets all the subcategories of an especific category
  findSubcategoryByCategoryId(category_id: string | number) {
    return this.http.get( this.url + "/subcategories/" + category_id)
  }
 
 /**********************************************************************************
  ***** Client User ***************************************************************
 ***********************************************************************************/
 
  //Gets all the subcategories of an especific category
  findClientUserById(user_id: string | number) {
    return this.http.get( this.url + "/clientuser/" + user_id)
  }

  //Creates a client user
  createClientUser() {
    return this.http.get( this.url + "/clientuser/create")
  }

  //Updates the data of an existent client user
  updateClientUser() {
    return this.http.get( this.url + "/clientuser/update")
  }


}
