import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PrimaryNavComponent } from './components/primary-nav/primary-nav.component';
import { SecondaryNavComponent } from './components/secondary-nav/secondary-nav.component';
import { IndexComponent } from './components/index/index.component';
import { AuthComponent } from './components/auth/auth.component';
import { SuperAdminComponent } from './components/superAdmin/super-admin/super-admin.component';
import { UserDaashboardComponent } from './components/user-daashboard/user-daashboard.component';
import { SellerDarshboardComponent } from './components/seller-darshboard/seller-darshboard.component';
import { ProductsComponent } from './components/superAdmin/products/products.component';
import { CategoriesComponent } from './components/superAdmin/categories/categories.component';
import { CollectionsComponent } from './components/superAdmin/collections/collections.component';
import { MarksComponent } from './components/superAdmin/marks/marks.component';
import { SellersComponent } from './components/superAdmin/sellers/sellers.component';
import { UsersComponent } from './components/superAdmin/users/users.component';
import { SuccessProductAddedComponent } from './components/superAdmin/entryComponents/success-product-added/success-product-added.component';

import { MatDialogModule } from '@angular/material/dialog';
import { PrimarySlideComponent } from './components/superAdmin/primary-slide/primary-slide.component';
import { ExproleProductComponent } from './components/exprole-product/exprole-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListProductsComponent } from './components/list-products/list-products.component';
import {MatRadioModule} from '@angular/material/radio';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerAccountComponent } from './components/customer-account/customer-account.component';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CustomerAccountDashboardComponent } from './components/customer-account-dashboard/customer-account-dashboard.component';
import { CustomerAccounCartComponent } from './components/customer-accoun-cart/customer-accoun-cart.component';
import { CustomerAccountProductsComponent } from './components/customer-account-products/customer-account-products.component';
import { CustomerAccountVendorProgressComponent } from './components/customer-account-vendor-progress/customer-account-vendor-progress.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { VendorApplicationComponent } from './components/vendor-application/vendor-application.component';
import { LogoutPopUpComponent } from './components/logout-pop-up/logout-pop-up.component';
import { CustomerAccountVendorProfileComponent } from './components/customer-account-vendor-profile/customer-account-vendor-profile.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    PrimaryNavComponent,
    SecondaryNavComponent,
    IndexComponent,
    AuthComponent,
    SuperAdminComponent,
    UserDaashboardComponent,
    SellerDarshboardComponent,
    ProductsComponent,
    CategoriesComponent,
    CollectionsComponent,
    MarksComponent,
    SellersComponent,
    UsersComponent,
    SuccessProductAddedComponent,
    PrimarySlideComponent,
    ExproleProductComponent,
    ListProductsComponent,
    ShoppingCartComponent,
    CustomerAccountComponent,
    CustomerAccountDashboardComponent,
    CustomerAccounCartComponent,
    CustomerAccountProductsComponent,
    CustomerAccountVendorProgressComponent,
    VendorApplicationComponent,
    LogoutPopUpComponent,
    CustomerAccountVendorProfileComponent,
    CustomerOrdersComponent
  
  ],
  entryComponents: [
   SuccessProductAddedComponent,LogoutPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    CarouselModule,
    MatRadioModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      progressBar:true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    MatProgressSpinnerModule

  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
