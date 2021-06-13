import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieService } from 'ngx-cookie-service';
import { ImageCropperModule } from 'ngx-image-cropper';

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
import { CustomerComponent } from './customer/customer.component';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { FAQComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { FormContactComponent } from './form-contact/form-contact.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormProductUpdateComponent } from './form-product-update/form-product-update.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormReportComponent } from './form-report/form-report.component';
import { FormSearchComponent } from './form-search/form-search.component';
import { FormShopComponent } from './form-shop/form-shop.component';
import { FormUpdatePasswordComponent } from './form-update-password/form-update-password.component';
import { FormUserComponent } from './form-user/form-user.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RatingComponent } from './rating/rating.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { SearchComponent } from './search/search.component';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { ShopComponent } from './shop/shop.component';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { TermsComponent } from './terms/terms.component';
import { NgxImageCompressService } from 'ngx-image-compress';

const rutas=[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'busqueda', component: SearchComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: 'tienda/:id', component: ShopComponent},
  { path: 'login', component: FormLogInComponent, canActivate: [NotLoggedGuard]},
  { path: 'logout', redirectTo: '/home', pathMatch: 'full'},
  { path: 'mi-usuario', component: CustomerComponent, canActivate: [ClientGuard]},
  { path: 'registro-cliente', component: FormUserComponent, canActivate: [NotLoggedGuard]},
  { path: 'registro-tienda', component: FormShopComponent, canActivate: [NotLoggedGuard]},
  { path: 'administrar-tienda', component: ShopManagementComponent, canActivate: [ShopGuard]},
  { path: 'administrar-tienda/editar/producto/:id', component: FormProductUpdateComponent, canActivate: [ShopGuard]},
  { path: 'administrar-tienda/nuevo-producto', component: FormProductComponent, canActivate: [ShopGuard]},
  { path: 'informar', component: FormReportComponent},
  { path: 'vender-en-acho-market', component: ShopInfoComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'terminos', component: TermsComponent},
  { path: 'contacto', component: FormContactComponent},
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
    CustomerComponent,
    Error401Component,
    Error403Component,
    Error404Component,
    Error500Component,
    FAQComponent,
    FooterComponent,
    FormContactComponent,
    FormLogInComponent,
    FormReviewComponent,
    FormProductComponent,
    FormProductUpdateComponent,
    FormReportComponent,
    FormSearchComponent,
    FormShopComponent,
    FormUpdatePasswordComponent,
    FormUserComponent,
    HeaderComponent,
    HomeComponent,
    LoadingScreenComponent,
    PhotoGalleryComponent,
    ProductCardComponent,
    ProductComponent,
    PurchaseComponent,
    RatingComponent,
    ReviewCardComponent,
    ScrollToTopComponent,
    SearchComponent,
    SearchSidebarComponent,
    ShopCardComponent,
    ShopComponent,
    ShopInfoComponent,
    ShopManagementComponent,
    SubcategoryFilterPipe,
    TermsComponent,
    PriceFilterPipe,
    RateFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    InfiniteScrollModule,
    ImageCropperModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
    NotLoggedGuard,
    ClientGuard,
    ShopGuard,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
}
)
export class AppModule { }
