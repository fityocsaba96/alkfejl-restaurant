import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }
}
