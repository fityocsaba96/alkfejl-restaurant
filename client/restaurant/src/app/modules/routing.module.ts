import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../models/user';
import { RoutingGuard } from '../services/routing-guard.service';
import { UserService } from '../services/user.service';
import { RestaurantListComponent } from '../components/restaurant-list/restaurant-list.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductListByCategoryComponent } from '../components/product-list-by-category/product-list-by-category.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoutingGuard],
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: RestaurantListComponent, data: { roles: [Role.ADMIN, Role.USER, Role.GUEST] } }, /*
      { path: 'user/register', component: RegisterComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/login', component: LoginComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/settings', component: UserSettingsComponent, data: { roles: [Role.ADMIN, Role.USER] } },*/
      { path: 'products', component: ProductListComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'category/:id/products', component: ProductListByCategoryComponent, data: { roles: [Role.ADMIN, Role.USER] } }/*,
      { path: 'cart', component: CartComponent, data: { roles: [Role.USER] } },
      { path: 'user/orders', component: UserOrderListComponent, data: { roles: [Role.USER] } },
      { path: 'product/:id/reviews', component: ProductReviewListComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'orders/incoming', component: IncomingOrderListComponent, data: { roles: [Role.ADMIN] } },
      { path: 'products/add', component: AddProductComponent, data: { roles: [Role.ADMIN] } }*/
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [UserService]
})
export class RoutingModule { }
