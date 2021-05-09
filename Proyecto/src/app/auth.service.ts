import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from './cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: Cookie = null;

  constructor(private cookieService: CookieService, private router: Router) {
    this.currentUser = this.loadCurrentUser();
  }

  deleteCurrentUser(): void {
    console.log("la cookie ha morido")
    if (this.cookieService.check('currentUser')) {
      this.currentUser = null;
      this.cookieService.delete('currentUser');
    }
  }

  getCurrentUser(): Cookie {
    return this.currentUser;
  }

  getCurrentUserName(): string {
    return (this.currentUser&&this.currentUser.name) ? this.currentUser.name : null;
  }

  getCurrentUserId(): number {
    return (this.currentUser&&this.currentUser.id) ? this.currentUser.id : null;
  }

  getCurrentUserToken(): string {
    return (this.currentUser&&this.currentUser.token) ? this.currentUser.token : null;
  }

  loadCurrentUser(): Cookie {
    return this.cookieService.check('currentUser') ? <Cookie> JSON.parse(this.cookieService.get('currentUser')) : null;
  }

  setCurrentUser(cookie: Cookie): void {
    // console.log(this.getCurrentUser());
    // console.log(this.currentUser);

    this.currentUser = cookie;
    this.cookieService.set('currentUser', JSON.stringify(cookie), {expires: 1, sameSite: "Lax"})
    
  //   console.log(this.currentUser);
  //   console.log(this.getCurrentUser());
  }

  isAuthenticated(): boolean {
    return (this.getCurrentUserToken() != null && this.cookieService.check('currentUser')["token"] != this.getCurrentUserToken()) ? true : false;
  };

  logout():void{
    this.deleteCurrentUser();
    this.router.navigate(['/login']);
  }



  













  // getAuthorizationToken() {
  //   console.log("authorization")
  //   return this.localStorage.getCurrentToken();
  // }
  
}
