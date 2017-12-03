import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { Role } from '../models/user';

@Injectable()
export class RoutingGuard implements CanActivateChild {

  constructor() { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.data.roles === undefined || route.data.roles.length === 0) {
      return false;
    }
    if (route.data.roles.includes(UserService.role)) {
      return true;
    }
  }
}
