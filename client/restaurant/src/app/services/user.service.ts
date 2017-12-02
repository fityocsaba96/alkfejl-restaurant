import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private static user: User;

  constructor(
    private http: HttpClient
  ) { }

  public syncLoginStatus(): void {
    this.http.get('/api/user/me').subscribe((response) => {
      UserService.user = new User(response);
    });
  }
}
