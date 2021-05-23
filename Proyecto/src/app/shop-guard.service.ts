import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if ( this.auth.isAuthenticatedShop()) {
      return true;
    } else {
      this.router.navigate(["/401"]);
      return false;
    }
  }
}