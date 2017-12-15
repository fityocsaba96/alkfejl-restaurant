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
    return this.http.get<Product[]>(`/api/category/${String(id)}/products`);
  }

  public addToCart(id: number): void {
    const key = `cartQty${String(id)}`, value = window.sessionStorage.getItem(key);
    let newValue;
    if (value) {
      newValue = String((Number(value) + 1));
    } else {
      newValue = '1';
    }
    window.sessionStorage.setItem(key, newValue);
  }

  public addProduct(name: string, description: string, price: string, categoryId: number): Observable<Product> {
    return this.http.post<Product>('/api/products', {
      name,
      description,
      price: Number(price),
      category: categoryId ? {
        id: categoryId
      } : undefined
    });
  }

  public getCartData() {
    const cartData = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key: string = window.sessionStorage.key(i);

      if (key.substr(0, 7) === 'cartQty') {
        cartData.push({
          id: Number(key.substr(7)),
          quantity: Number(window.sessionStorage.getItem(key))
        });
      }
    }
    return cartData.sort((a, b) => a.id - b.id);
  }

  public deleteFromCart(id: number): void {
    window.sessionStorage.removeItem(`cartQty${String(id)}`);
  }

  public emptyCart(currentCartProductIds: number[]): void {
    currentCartProductIds.forEach(id => window.sessionStorage.removeItem(`cartQty${String(id)}`));
  }

  public deleteProductById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`/api/product/${String(id)}`);
  }
}
