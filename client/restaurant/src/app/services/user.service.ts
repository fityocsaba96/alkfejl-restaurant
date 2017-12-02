import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';

@Injectable()
export class UserService {

  private static _user: User;

  constructor(
    private http: HttpClient
  ) { }

  public syncLoginStatus(): void {
    this.http.get('/api/user/me').subscribe(response => {
      UserService._user = new User(response);
    }, () => {});
  }

  public static get user() {
    return UserService._user;
  }

  public getRole(): Role {
    return UserService._user.isAdmin ? Role.ADMIN : Role.USER;
  }

  public isLoggedIn(): boolean {
    return UserService._user !== undefined;
  }
}
