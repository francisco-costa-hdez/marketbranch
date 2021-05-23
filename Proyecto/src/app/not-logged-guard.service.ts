import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard  implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
   if (this.auth.isAuthenticated()) {
     this.router.navigate(["/403"]);
     return false;
   } else {
    return true;
   }
  }
}


// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { CanActivate } from '@angular/router';
// import { LoginService } from '../login/login.service';

// @Injectable()
// export class CanActivateViaAuthGuard implements CanActivate {

//     constructor(private authService: LoginService, private router: Router) { }

//     canActivate() {
//         // If the user is not logged in we'll send them back to the home page
//         if (!this.authService.isLogged()) {
//             console.log('No estás logueado');
//             this.router.navigate(['/']);
//             return false;
//         }

//         return true;
//     }
// }