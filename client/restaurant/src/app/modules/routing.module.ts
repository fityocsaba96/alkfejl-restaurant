import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../models/user';
import { RoutingGuard } from '../services/routing-guard.service';
import { UserService } from '../services/user.service';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoutingGuard],
    children: [
      /*{ path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: RestaurantListComponent, data: { roles: [Role.ADMIN, Role.USER, Role.GUEST] } },
      { path: 'user/register', component: RegisterComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/login', component: LoginComponent, data: { roles: [Role.GUEST] } },
      { path: 'user/settings', component: UserSettingsComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'products', component: ProductsComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'category/:id/products', component: ProductsByCategoryComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'cart', component: CartComponent, data: { roles: [Role.USER] } },
      { path: 'user/orders', component: UserOrdersComponent, data: { roles: [Role.USER] } },
      { path: 'product/:id/reviews', component: ProductReviewsComponent, data: { roles: [Role.ADMIN, Role.USER] } },
      { path: 'orders/incoming', component: IncomingOrdersComponent, data: { roles: [Role.ADMIN] } },
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
