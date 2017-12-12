import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { City } from '../models/city';

@Injectable()
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>('/api/cities');
  }
}
