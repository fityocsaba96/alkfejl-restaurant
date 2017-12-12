import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/restaurant';
import { City } from '../models/city';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private static _user: User;
  private static _role: Role;

  private _loggedIn: Subject<any>;

  constructor(
    private http: HttpClient
  ) {
    this._loggedIn = new Subject();
  }

  public setLoggedIn(user: User): void {
    UserService._user = user;
    UserService._role = UserService._user.isAdmin ? Role.ADMIN : Role.USER;
    this._loggedIn.next();
  }

  public setLoggedOut(): void {
    UserService._user = undefined;
    UserService._role = Role.GUEST;
  }

  public static get user(): User {
    return UserService._user;
  }

  public static set user(user: User) {
    UserService._user = user;
  }

  public static get role(): Role {
    return UserService._role;
  }

  public syncLoginStatus(): Promise<User> {
    return new Promise((resolve, reject) => {

      this.http.get<User>('/api/user/me').subscribe(response => {
        this.setLoggedIn(new User(response));
        resolve();
      }, () => {
        UserService._role = Role.GUEST;
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
      zipCode: parseInt(zipCode),
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
