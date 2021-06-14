import { EventEmitter, Injectable } from '@angular/core';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: Array<any> = []
  cartUpdated: EventEmitter<Array<any>> = new EventEmitter();

  constructor(private auth: AuthService, private db: MarketPlaceDBService) {
    this.initializeCartList()
  }

  getCartList() {
    return this.cartList;
  }

  setCartList(cart: Array<any>) {
    this.cartList = [...cart];
  }

  addToCartList(productId: number) {
    if (this.auth.isAuthenticatedClient()) {
      if (!this.isInCart(productId)){
        this.db.addToCart(productId, this.auth.getCurrentUserId()).subscribe(
          (response) => {
            if (response) {
              // console.log(response);
              this.initializeCartList()
            } else {
              // console.log("no response");
            }
          },
          (error) => {
            console.error('Request failed with error');
            console.error(error);
          }
        );
      } else {
        // console.log("este elemento ya está en el carrito");
      }
    } else {
      // console.log("inicia sesión");
    }
  }

 deleteFromCartList(productId: number) {
  if (this.auth.isAuthenticatedClient()) {
    if (this.isInCart(productId)){
      this.db.deleteFromCart(productId, this.auth.getCurrentUserId()).subscribe(
        (response) => {
          if (response) {
            // console.log(response);
            this.initializeCartList()
          } else {
            // console.log("no response");
          }
        },
        (error) => {
          console.error('Request failed with error');
          console.error(error);
        }
      );
    } else {
      // console.log("este elemento no está en el carrito");
    }
  }
 }

  isInCart(productId: number) {
    let alreadyAdded: boolean = false;
    for ( let i: number = 0; i < this.cartList.length && !alreadyAdded; i++) {
      if (this.cartList[i].id == productId) {
        alreadyAdded = true;
      }
    }
    return alreadyAdded;
  }

  isSameQuantity(quantity: number, productId: number) {
    let found: boolean = false;
    let isSame: boolean = true;
    for ( let i: number = 0; i < this.cartList.length && !found; i++) {
      if (this.cartList[i].id == productId) {
        found = true;
        isSame = (this.cartList[i].quantity == quantity) ? true : false;
      }
    }
    return isSame;
  }

  updateQuantity(quantity: number, productId: number) {
    console.log(productId, quantity)
    if (this.auth.isAuthenticatedClient()) {
      if (this.isInCart(productId)){
        this.db.updateQuantityInCartproduct_id(this.auth.getCurrentUserId(), quantity, productId).subscribe(
          (response) => {
            if (response) {
              // console.log(response);
              this.initializeCartList()
            } else {
              // console.log("no response");
            }
          },
          (error) => {
            console.error('Request failed with error');
            console.error(error);
          }
        );
      } else {
        // console.log("este elemento no está en el carrito");
      }
    } else {
      // console.log("inicia sesión");
    }
  }

  private initializeCartList() {
    this.cartList = [];
    if (this.auth.isAuthenticatedClient()){
      this.db.getCart(this.auth.getCurrentUserId()).subscribe(
        (response) => {
          if (response["products"]) {
            response["products"].forEach((item) =>{
              this.cartList.push(item);
            });
            // console.table(this.cartList)
            this.cartUpdated.emit(this.cartList);
          } 
          // console.log(this.cartList)
        },
        (error) => {
          // console.error('Request failed with error');
          // console.error(error);
        }
      );
    }
  }
}
