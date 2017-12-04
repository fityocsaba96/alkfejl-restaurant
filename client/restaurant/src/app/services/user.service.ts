import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class UserService {

  private static _user: User;
  private static _role: Role;
  private _sharedLoginInfoRequest: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    UserService._role = Role.GUEST;
    this._sharedLoginInfoRequest = this.http.get<User>('/api/user/me').share();
  }

  public syncLoginStatus(): void {
    this._sharedLoginInfoRequest.subscribe(response => {
      UserService._user = new User(response);
      UserService._role = UserService._user.isAdmin ? Role.ADMIN : Role.USER;
    }, () => {});
  }

  public login(email:string, password: string): Observable<User>{ 
    return this.http.post('api/user/login', {
        email,
        password
    }) as Observable<User>;
}

  public setUser(user: User) {
    UserService._user = user;
  }

  public static get role(): Role {
    return UserService._role;
  }

  public get sharedLoginInfoRequest() {
    return this._sharedLoginInfoRequest;
  }
}
