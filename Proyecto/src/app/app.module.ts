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
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselOfItemsComponent } from './carousel-of-items/carousel-of-items.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ProductComponent } from './product/product.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ReportABugComponent } from './report-abug/report-abug.component';


const rutas=[
  { path: 'home', component: HomeComponent},
  { path: 'cliente', component: CustomerComponent},
  { path: 'registro', component: FormUserComponent},
  { path: 'buscar', component: ProductSearchComponent},
  { path: 'producto', component: ProductComponent},
  { path: 'informar', component: ReportABugComponent},
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
    FormUserComponent,
    ProductSearchComponent,
    ProductCardComponent,
    CarouselOfItemsComponent,
    ScrollToTopComponent,
    ProductComponent,
    CommentCardComponent,
    ReportABugComponent
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
