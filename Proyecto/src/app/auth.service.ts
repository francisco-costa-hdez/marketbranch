import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MarketPlaceDBService } from 'src/app/market-place-db.service';
import { Cookie } from './cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: Cookie = null;

  constructor(private cookieService: CookieService, private db: MarketPlaceDBService, private router: Router) {
    this.currentUser = this.loadCurrentUser();
  }

  deleteCurrentUser(): void {
    if (this.cookieService.check('currentUser')) {
      this.currentUser = null;
      this.cookieService.delete('currentUser');
      this.router.navigate(['/logout']);
    }
  }

  getCurrentUser(): Cookie {
    return this.currentUser;
  }

  getCurrentUserName(): string {
    return (this.currentUser && this.currentUser.name) ? this.currentUser.name : null;
  }

  getCurrentUserId(): number {
    return (this.currentUser && this.currentUser.id) ? this.currentUser.id : null;
  }

  getCurrentUserToken(): string {
    return (this.currentUser && this.currentUser.token) ? this.currentUser.token : null;
  }

  getCurrentUserShop(): string {
    return (this.currentUser && this.currentUser.shop) ? this.currentUser.shop : null;
  }

  loadCurrentUser(): Cookie {
    return this.cookieService.check('currentUser') ? <Cookie> JSON.parse(this.cookieService.get('currentUser')) : null;
  }

  setCurrentUser(cookie: Cookie): void {
    // console.log(this.getCurrentUser());
    // console.log(this.currentUser);

    this.currentUser = cookie;
    this.cookieService.set('currentUser', JSON.stringify(cookie), {expires: 1, sameSite: "Lax"})
    
    // console.log(this.currentUser);
    // console.log(this.getCurrentUser());
  }

  // isAuthenticated(): boolean {
  //   return (this.getCurrentUserToken() != null && this.cookieService.check('currentUser')["token"] != this.getCurrentUserToken()) ? true : false;
  // };
  
  // isAuthenticatedShop(): boolean {
  //   return  (((this.getCurrentUserToken() != null && this.cookieService.check('currentUser')["token"] != this.getCurrentUserToken()) ? true : false)
  //            && ((this.getCurrentUserShop() != null && this.cookieService.check('currentUser')["shop"] != this.getCurrentUserShop()) ? true : false));
  // };

  // isAuthenticatedClient(): boolean {
  //   return  (((this.getCurrentUserToken() != null && this.cookieService.check('currentUser')["token"] != this.getCurrentUserToken()) ? true : false)
  //            && ((this.getCurrentUserShop() == null && this.cookieService.check('currentUser')["shop"] == this.getCurrentUserShop()) ? true : false));
  // };

  isAuthenticated(): boolean {
    return (this.getCurrentUserToken() != null && this.loadCurrentUser().token == this.getCurrentUserToken()) ? true : false;
  };
  
  isAuthenticatedShop(): boolean {
    return  (((this.getCurrentUserToken() != null && this.loadCurrentUser().token == this.getCurrentUserToken()) ? true : false)
             && ((this.getCurrentUserShop() != null && this.loadCurrentUser().shop == this.getCurrentUserShop()) ? true : false));
  };

  isAuthenticatedClient(): boolean {
    return  (((this.getCurrentUserToken() != null && this.cookieService.check('currentUser')["token"] != this.getCurrentUserToken()) ? true : false)
             && ((this.getCurrentUserShop() == null && this.loadCurrentUser().shop == this.getCurrentUserShop()) ? true : false));
  };

  logout():void{
    (this.getCurrentUserShop()) ? this.logOutShop() : this.logOutClient();
  }

  private logOutClient() {
    this.db.LogOutClientUser(this.getCurrentUserId()).subscribe(
      (response) => {
        if (response["message"]=="logged out") {
          this.deleteCurrentUser();
        } else {
          console.log("Error" + response);
        }
      },
      (error) => {
        console.log("Se ha producido un error:")
        console.log(error)
      }
    ); 
  }

  private logOutShop() {
    this.db.LogOutShopUser(this.getCurrentUserId()).subscribe(
      (response) => {
        if (response["message"]=="logged out") {
          this.deleteCurrentUser();
        } else {
          console.log("Error" + response);
        }
      },
      (error) => {
        console.log("Se ha producido un error:")
        console.log(error)
      }
    ); 
  }

  // getAuthorizationToken() {
  //   console.log("authorization")
  //   return this.localStorage.getCurrentToken();
  // }
  
}
