import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../models/user';
import { RoutingGuard } from '../services/routing-guard.service';
import { RestaurantListComponent } from '../components/restaurant-list/restaurant-list.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductListByCategoryComponent } from '../components/product-list-by-category/product-list-by-category.component';
import { CartComponent } from '../components/cart/cart.component';
import { IncomingOrderListComponent } from '../components/incoming-order-list/incoming-order-list.component';
import { LoginComponent } from '../components/login/login.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserOrderListComponent } from '../components/user-order-list/user-order-list.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductReviewListComponent } from '../components/product-review-list/product-review-list.component';
import { UserSettingsComponent } from '../components/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoutingGuard],
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: RestaurantListComponent, data: { roles: [Role.ADMIN, Role.USER, Role.GUEST] } },
      { path: 'user/register', component: RegisterComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/login', component: LoginComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/settings', component: UserSettingsComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'products', component: ProductListComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'category/:id/products', component: ProductListByCategoryComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'cart', component: CartComponent, data: { roles: [Role.USER] } },
      { path: 'user/orders', component: UserOrderListComponent, data: { roles: [Role.USER] } },
      { path: 'order/:id', component: OrderComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'product/:id/reviews', component: ProductReviewListComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'orders/incoming', component: IncomingOrderListComponent, data: { roles: [Role.ADMIN] } },
      { path: 'products/add', component: AddProductComponent, data: { roles: [Role.ADMIN] } }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
