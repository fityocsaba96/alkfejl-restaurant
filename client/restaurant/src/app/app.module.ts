import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './modules/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { RoutingGuard } from './services/routing-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListByCategoryComponent } from './components/product-list-by-category/product-list-by-category.component';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { RestaurantService } from './services/restaurant.service';
import { ProductService } from './services/product.service';
import { CartComponent } from './components/cart/cart.component';
import { IncomingOrderComponent } from './components/incoming-order/incoming-order.component';
import { IncomingOrderListComponent } from './components/incoming-order-list/incoming-order-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderService } from './services/order.service';
import { StatusService } from './services/status.service';
import { CityService } from './services/city.service';
import { UserOrderListComponent } from './components/user-order-list/user-order-list.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { UserOrderOverviewComponent } from './components/user-order-overview/user-order-overview.component';
import { ProductReviewListComponent } from './components/product-review-list/product-review-list.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { ReviewService } from './services/review.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RestaurantListComponent,
    RestaurantComponent,
    ProductListComponent,
    ProductComponent,
    ProductListByCategoryComponent,
    CartComponent,
    IncomingOrderComponent,
    IncomingOrderListComponent,
    LoginComponent,
    AddProductComponent,
    RegisterComponent,
    UserOrderListComponent,
    UserOrderComponent,
    UserOrderOverviewComponent,
    ProductReviewListComponent,
    ProductReviewComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => () => userService.syncLoginStatus(),
      deps: [UserService],
      multi: true
    },
    RoutingGuard,
    UserService,
    CategoryService,
    RestaurantService,
    ProductService,
    OrderService,
    StatusService,
    CityService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
