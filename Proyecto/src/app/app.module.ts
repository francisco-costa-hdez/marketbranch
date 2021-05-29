import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieService } from 'ngx-cookie-service';

import { NotLoggedGuard } from './not-logged-guard.service';
import { ClientGuard } from './client-guard.service';
import { ShopGuard } from './shop-guard.service';

import { RateFilterPipe } from './rate-filter.pipe';
import { PriceFilterPipe } from './price-filter.pipe';
import { SubcategoryFilterPipe } from './subcategory-filter.pipe';

import { AuthInterceptor } from './auth-interceptor';

import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { CarouselOfItemsComponent } from './carousel-of-items/carousel-of-items.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerComponent } from './customer/customer.component';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { FAQComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormSearchComponent } from './form-search/form-search.component';
import { FormShopComponent } from './form-shop/form-shop.component';
import { FormUserComponent } from './form-user/form-user.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RatingComponent } from './rating/rating.component';
import { ReportABugComponent } from './report-abug/report-abug.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { SearchComponent } from './search/search.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { ShopComponent } from './shop/shop.component';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { TermsComponent } from './terms/terms.component';
import { UpdateFormProductComponent } from './update-form-product/update-form-product.component';

const rutas=[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'busqueda', component: SearchComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: 'tienda/:id', component: ShopComponent},
  { path: 'login', component: FormLogInComponent, canActivate: [NotLoggedGuard]},
  { path: 'logout', redirectTo: '/home', pathMatch: 'full'},
  { path: 'user', component: CustomerComponent, canActivate: [ClientGuard]},
  { path: 'registrouser', component: FormUserComponent, canActivate: [NotLoggedGuard]},
  { path: 'registroprod', component: FormProductComponent, canActivate: [ShopGuard]},
  { path: 'registroshop', component: FormShopComponent, canActivate: [NotLoggedGuard]},
  { path: 'manageshop', component: ShopManagementComponent, canActivate: [ShopGuard]},
  { path: 'manageshop/edit/product/:id', component: UpdateFormProductComponent, canActivate: [ShopGuard]},
  { path: 'informar', component: ReportABugComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'terminos', component: TermsComponent},
  { path: 'contacto', component: ContactComponent},
  { path: 'faq', component: FAQComponent},
  { path: '401', component: Error401Component},
  { path: '403', component: Error403Component},
  { path: '**', component: Error404Component}
] 

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    CarouselOfItemsComponent,
    CartComponent,
    CartItemComponent,
    ContactComponent,
    CustomerComponent,
    Error401Component,
    Error403Component,
    Error404Component,
    Error500Component,
    FAQComponent,
    FooterComponent,
    FormLogInComponent,
    FormReviewComponent,
    FormProductComponent,
    FormSearchComponent,
    FormShopComponent,
    FormUserComponent,
    HeaderComponent,
    HomeComponent,
    LoadingScreenComponent,
    PhotoGalleryComponent,
    ProductCardComponent,
    ProductComponent,
    PurchaseComponent,
    RatingComponent,
    ReportABugComponent,
    ReviewCardComponent,
    ScrollToTopComponent,
    SearchComponent,
    SearchSidebarComponent,
    ShopCardComponent,
    ShopComponent,
    ShopManagementComponent,
    TermsComponent,
    PriceFilterPipe,
    RateFilterPipe,
    SubcategoryFilterPipe,
    UpdateFormProductComponent
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
    CookieService,
    NotLoggedGuard,
    ClientGuard,
    ShopGuard
  ],
  bootstrap: [AppComponent]
}
)
export class AppModule { }
