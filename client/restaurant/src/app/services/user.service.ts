import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/restaurant';
import { City } from '../models/city';

@Injectable()
export class UserService {

  private static _user: User;
  private static _role: Role;

  constructor(
    private http: HttpClient
  ) { }

  public syncLoginStatus(): Promise<User> {
    return new Promise((resolve, reject) => {

      this.http.get<User>('/api/user/me').subscribe(response => {
        UserService._user = new User(response);
        UserService._role = UserService._user.isAdmin ? Role.ADMIN : Role.USER;
        resolve();
      }, () => {
        UserService._role = Role.GUEST;
        resolve();
      });
    });
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

  public register(email:string, firstName:string, lastName:string, password:string, zipCode:number, city:City, address: string, 
    phoneNumber:string,restaurant:Restaurant, is_admin:boolean) : Observable<User> { 
    return this.http.post('api/user/register', {
        "email":email,
        "firstName":firstName,
        "lastName":lastName,
        "passwordHash":password,
        "zipCode":zipCode,
        "city":city,
        "address":address,
        "phoneNumber":phoneNumber,
        "restaurant":restaurant,
        "isAdmin":is_admin
      }) as Observable<User>;
  }

  public logout():void{
    this.http.post('api/user/logout','').subscribe(() => {
      UserService._user = undefined;
      UserService._role = Role.GUEST;
    });
  }
}
