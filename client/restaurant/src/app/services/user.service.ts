import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private static _user: User;
  private static _role: Role;

  private _loggedIn: Subject<any>;

  private _isGuest: boolean;
  private _isUser: boolean;
  private _isAdmin: boolean;

  constructor(
    private http: HttpClient
  ) {
    this._loggedIn = new Subject();
  }

  public setLoggedIn(user: User): void {
    UserService._user = user;
    this._isGuest = false;

    if (UserService._user.isAdmin) {
      UserService._role = Role.ADMIN;
      [this._isAdmin, this._isUser] = [true, false];
    } else {
      UserService._role = Role.USER;
      [this._isAdmin, this._isUser] = [false, true];
    }
    this._loggedIn.next();
  }

  public setLoggedOut(): void {
    UserService._user = undefined;
    UserService._role = Role.GUEST;
    [this._isGuest, this._isAdmin, this._isUser] = [true, false, false];
  }

  public get user(): User {
    return UserService._user;
  }

  public set user(user: User) {
    UserService._user = user;
  }

  public get role(): Role {
    return UserService._role;
  }

  public get isGuest(): boolean {
    return this._isGuest;
  }

  public get isUser(): boolean {
    return this._isUser;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public syncLoginStatus(): Promise<User> {
    return new Promise((resolve, reject) => {

      this.http.get<User>('/api/user/me').subscribe(response => {
        this.setLoggedIn(new User(response));
        resolve();
      }, () => {
        this.setLoggedOut();
        resolve();
      });
    });
  }

  public logIn(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/user/login', {
      email,
      password
    });
  }

  public get loggedIn(): Subject<any> {
    return this._loggedIn;
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>('/api/user/register', user);
  }

  public logOut(): Observable<boolean> {
    return this.http.post<boolean>('/api/user/logout', undefined);
  }

  public editSettings(user: User): Observable<User> {
    user.id = UserService._user.id;
    return this.http.put<User>('/api/user/me', user);
  }

  public userFormDataToUser(email: string, password: string, firstName: string, lastName: string, zipCode: string,
                            cityId: number, address: string, phoneNumber: string, restaurantId: number): User {
    return new User({
      email,
      lastName,
      firstName,
      passwordHash: password,
      zipCode: Number(zipCode),
      address,
      phoneNumber,
      restaurant: restaurantId ? {
        id: restaurantId
      } : undefined,
      city: cityId ? {
        id: cityId
      } : undefined
    });
  }
}
