import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  public getProductsByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${id}/products`);
  }

  public addToCart(id: number): void {
    const key = `cartQty${id.toString()}`, value = window.sessionStorage.getItem(key);
    let newValue;
    if (value) {
      newValue = (parseInt(value) + 1).toString();
    } else {
      newValue = '1';
    }
    window.sessionStorage.setItem(key, newValue);
  }

  public deleteFromCart(id: number): void {
    window.sessionStorage.removeItem(`cartQty${id.toString()}`);
  }
}
