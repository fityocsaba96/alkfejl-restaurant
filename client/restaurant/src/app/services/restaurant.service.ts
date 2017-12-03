import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/restaurant';

@Injectable()
export class RestaurantService {

  constructor(
    private http: HttpClient
  ) { }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/api/restaurants');
  }
}