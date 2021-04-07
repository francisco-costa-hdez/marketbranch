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
import { ShopComponent } from './shop/shop.component';
import { FAQComponent } from './faq/faq.component';
import { ReportABugComponent } from './report-abug/report-abug.component';
import { Error404Component } from './error404/error404.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { FormProductComponent } from './form-product/form-product.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FormShopComponent } from './form-shop/form-shop.component';
import { ShopManagementComponent } from './shop-management/shop-management.component';
import { FormsModule } from '@angular/forms';
import { FormSearchComponent } from './form-search/form-search.component';

const rutas=[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'cliente', component: CustomerComponent},
  { path: 'registro', component: FormUserComponent},
  { path: 'busqueda/:term', component: ProductSearchComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: 'tienda/:id', component: ShopComponent},
  { path: 'informar', component: ReportABugComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'terminos', component: TermsComponent},
  { path: 'contacto', component: ContactComponent},
  { path: 'registroprod', component: FormProductComponent},
  { path: 'registroshop', component: FormShopComponent},
  { path: 'manageshop', component: ShopManagementComponent},
  { path: 'faq', component: FAQComponent},
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
    ProductSearchComponent,
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
    FormSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
