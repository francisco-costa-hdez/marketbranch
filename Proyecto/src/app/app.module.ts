import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieService } from 'ngx-cookie-service';

import { RateFilterPipe } from './rate-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';
import { SubcategoryFilterPipe } from './subcategory-filter.pipe';

import { AuthInterceptor } from './auth-interceptor';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { FormUserComponent } from './form-user/form-user.component';
import { SearchComponent } from './search/search.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CarouselOfItemsComponent } from './carousel-of-items/carousel-of-items.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { ProductComponent } from './product/product.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ShopComponent } from './shop/shop.component';
import { FAQComponent } from './faq/faq.component';
import { ReportABugComponent } from './report-abug/report-abug.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { FormProductComponent } from './form-product/form-product.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FormShopComponent } from './form-shop/form-shop.component';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { FormSearchComponent } from './form-search/form-search.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartComponent } from './cart/cart.component';
import { FormShopValidComponent } from './form-shop-valid/form-shop-valid.component';
import { LoginGuard } from './login-guard.service';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

const rutas=[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'cliente', component: CustomerComponent},
  { path: 'login', component: FormLogInComponent, canActivate: [LoginGuard]},
  { path: 'logout', redirectTo: '/home', pathMatch: 'full'},
  { path: 'registrouser', component: FormUserComponent},
  { path: 'busqueda', component: SearchComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: 'tienda/:id', component: ShopComponent},
  { path: 'informar', component: ReportABugComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'terminos', component: TermsComponent},
  { path: 'contacto', component: ContactComponent},
  { path: 'registroprod', component: FormProductComponent},
  { path: 'registroshop', component: FormShopComponent},
  { path: 'manageshop', component: ShopManagementComponent},
  { path: 'validshopuser', component: FormShopValidComponent},
  { path: 'faq', component: FAQComponent},
  { path: '401', component: Error401Component},
  { path: '403', component: Error403Component},
  { path: '**', component: Error404Component}
] 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CustomerComponent,
    FormUserComponent,
    SearchComponent,
    ProductCardComponent,
    CarouselOfItemsComponent,
    ScrollToTopComponent,
    ProductComponent,
    CommentCardComponent,
    ShopComponent,
    FAQComponent,
    ReportABugComponent,
    Error404Component,
    AboutUsComponent,
    TermsComponent,
    ContactComponent,
    FormProductComponent,
    PhotoGalleryComponent,
    FormShopComponent,
    ShopManagementComponent,
    FormSearchComponent,
    LoadingScreenComponent,
    ShopCardComponent,
    Error500Component,
    SearchSidebarComponent,
    RateFilterPipe,
    PriceFilterPipe,
    FormLogInComponent,
    SubcategoryFilterPipe,
    CartItemComponent,
    CartComponent,
    FormShopValidComponent,
    Error401Component,
    Error403Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    InfiniteScrollModule,
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService ,
    LoginGuard
  ],
  bootstrap: [AppComponent]
}
)
export class AppModule { }
