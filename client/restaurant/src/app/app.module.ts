import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './modules/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { RoutingGuard } from './services/routing-guard.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListByCategoryComponent } from './components/product-list-by-category/product-list-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RestaurantListComponent,
    RestaurantComponent,
    ProductListComponent,
    ProductComponent,
    ProductListByCategoryComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [RoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
