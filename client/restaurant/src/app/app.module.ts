import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { OrderComponent } from './components/order/order.component';
import { IncomingOrderListComponent } from './components/incoming-order-list/incoming-order-list.component';
import { LoginComponent } from './components/login/login.component';

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
    OrderComponent,
    IncomingOrderListComponent,
    LoginComponent
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
  providers: [RoutingGuard, UserService, CategoryService, RestaurantService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
