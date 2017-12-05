import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get('api/orders/incoming') as Observable<Order[]>
  }

  update(order:Order) {
    return this.http.put('api/order/' + order.id, order);
  }

  public placeOrder(cartTableData: any[], note: string): Observable<Order> {
    return this.http.post<Order>('/api/order', this.generateOrderRequest(cartTableData, note));
  }

  private generateOrderRequest(cartTableData: any[], note: string) {
    return {
      note,
      orderProducts: cartTableData.map(cartItem => {
        return {
          quantity: cartItem.quantity,
          product: {
            id: cartItem.id
          }
        };
      })
    };
  }
}
