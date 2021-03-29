import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { FormUserComponent } from './form-user/form-user.component';


const rutas=[
  { path: 'home', component: HomeComponent},
  { path: 'cliente', component: CustomerComponent},
  { path: 'registro', component: FormUserComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  // { path: '**', component: Pagina404Component}
] 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CustomerComponent,
    FormUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
