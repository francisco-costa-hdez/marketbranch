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
    return this.http.get( this.url + "/products");
  }
  
  //Gets a product with detailed info
  findProductById(product_id: string | number) {
    return this.http.get( this.url + "/products/" + product_id);
  }

  //Gets all the products from an especific shop
  findProductByShop(shop_id: string | number) {
    return this.http.get( this.url + "/products/shop/" + shop_id);
  }

  //Gets all the products from an especific subcategory
  findProductsBySubcategory(subcategory_id: string | number) {
    return this.http.get( this.url + "/products/subcategory/" + subcategory_id);
  }

  //Gets all the products from an especific category
  findProductsByCategory(category_id: string | number) {
    return this.http.get( this.url + "/products/category/" + category_id);
  }
  //Gets all the products from an especific category with coincidence with a pattern in name or description
  findProductsByCategoryAndName(category_id: string | number, search_term: string) {
    return this.http.get( this.url + "/products/category/" + category_id + "/name/" + search_term);
  }

  //Gets all the products a with coincidence with a pattern in name or description
  findProductsByString(search_term: string) {
    return this.http.get( this.url + "/products/str/" + search_term);
  }

  //Creates a product
  createProduct(product) {
    return this.http.post( this.url + "/products/create/", product);
  }

  //Updates a product
  updateProduct(product_id: string | number) {
    return this.http.put( this.url + "/products/update/", product_id);
  }
  
  //Delete a product
  deleteProduct(product_id: string | number) {
    return this.http.delete( this.url + "/products/delete/" + product_id);
  }
  
  //Creates a product image
  uploadProductImage(img) {
    return this.http.put( this.url + "/products/uploadImage/", img);
  }

  //Deletes a product image
  deleteProductImage(image_id: string | number) {
    return this.http.delete( this.url + "/products/uploadImage/" + image_id);
  }
  
  /**********************************************************************************
   ***** Shops **********************************************************************
  ***********************************************************************************/

  //Gets all the shops in the database
  findAllShops() {
    return this.http.get( this.url + "/shops");
  }
  
  //Gets a shop with detailed info
  findShopById(shop_id: string | number)  {
    return this.http.get( this.url + "/shops/" + shop_id);
  }
  
  //Gets a shop by one of its products
  findShopByProduct(product_id: string | number) {
    return this.http.get( this.url + "/shops/product/" + product_id);
  }
  
  //Gets all the shops with a coincidence with a pattern in name or description
  findShopByString(search_term: string) {
    return this.http.get( this.url + "/shops/str/" + search_term);
  }
  
  //Creates a shop
  createShop(shop) {
    return this.http.post( this.url + "/shop/create/", shop);
  }
  
  //Updates a shop
  updateShop(shop) {
    return this.http.put( this.url + "/shop/update/", shop);
  }
  
  //Delete a shop
  deleteShop(shop_id: string | number) {
    return this.http.delete( this.url + "/shop/delete/" + shop_id);
  }
  
  //Creates a shop image
  uploadShopImage(img) {
    return this.http.post( this.url + "/shop/uploadImage/", img);
  }
  
  //Deletes a shop image
  deleteShopImage(image_id: string | number) {
    return this.http.delete( this.url + "/shop/delete/img/" + image_id);
  }

  /**********************************************************************************
   ***** Categories *****************************************************************
  ***********************************************************************************/
  
  //Gets all the categories in the database
  findAllCategories() {
    return this.http.get( this.url + "/categories");
  }

  //Gets all the subcategories of an especific category
  findSubcategoryByCategoryId(category_id: string | number) {
    return this.http.get( this.url + "/subcategories/" + category_id);
  }
  
  //Gets the category of an especific subcategory
  findCategoryBysubCategoryId(subcategory_id: string | number) {
    return this.http.get( this.url + "/category/subcategory/" + subcategory_id);
  }
 
 /**********************************************************************************
  ***** Client User ****************************************************************
 ***********************************************************************************/

  //Logs in an user
  LogInClientUser(user) {
    return this.http.post( this.url + "/clientuser/login", user);
  }
  
  //Logs out an user
  LogOutClientUser(user_id: number) {
    return this.http.post( this.url + "/clientuser/logout", { "id" : user_id });
  }
  
  //Gets a clientUser with detailed info
  findClientUserById(user_id: string | number) {
    return this.http.get( this.url + "/clientuser/" + user_id);
  }

  //Creates a client user
  createClientUser(user) {
    return this.http.post( this.url + "/clientuser/create", user);
  }
  
  //Updates the data of an existent client user
  updateClientUser(user) {
    return this.http.put( this.url + "/clientuser/update", user);
  }
  
  //Deletes a client user
  deleteClientUser(user_id) {
    return this.http.delete( this.url + "/clientuser/delete/", user_id);
  }

 /**********************************************************************************
  ***** Shop User ******************************************************************
 ***********************************************************************************/

  //Logs in an user
  LogInShopUser(user) {
    return this.http.post( this.url + "/shopuser/login", user);
  }

  //Logs out an user
  LogOutShopUser(user_id: number) {
    return this.http.post( this.url + "/shopuser/logout", { "id" : user_id });
  }
    
  
  //Gets a shop user with detailed info
  findShopUserById(user_id: string | number) {
    return this.http.get( this.url + "/shopuser/" + user_id);
  }

  //Creates a shop user
  createShopUser(user) {
    return this.http.post( this.url + "/shopuser/create", user);
  }
  
  //Updates the data of an existent shop user
  updateShoptUser(user) {
    return this.http.put( this.url + "/shopuser/update", user);
  }
  
  //Deletes a shop user
  deleteShopUser(user_id) {
    return this.http.delete( this.url + "/shopuser/delete/", user_id);
  }

  /**********************************************************************************
   ***** Cart ***********************************************************************
  ***********************************************************************************/

    //Gets all the products in user's cart from the database
    getCart(user_id: string | number) {
      return this.http.get( this.url + "/cart/products/" + user_id);
    }
    
    //Adds a new product to user's cart
    addToCart(product_id: string | number, user_id: string | number) {
        return this.http.post( this.url + "/cart/add/"+ product_id + "/" + user_id,undefined);
    }

    //Adds a new product to user's cart
    deleteFromCart(product_id: string | number, user_id: string | number) {
      return this.http.delete( this.url + "/cart/delete/" + product_id + "/" + user_id);
    }
    
    //Adds a new product to user's cart
    updateQuantityInCartproduct_id(user_id: string | number, quantity: string | number, product_id: string | number) {

      return this.http.put( this.url + "/cart/update_quantity/" + user_id + "/" + quantity + "/" + product_id, undefined);
    }
}