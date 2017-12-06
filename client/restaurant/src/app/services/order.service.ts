import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';
import { UserService } from './user.service';
import { OrderResponse } from '../models/responses/order-response';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public getIncomingOrders(): Observable<Order[]> {
    return this.http.get('api/orders/incoming') as Observable<Order[]>
  }

  public getUserOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>('/api/user/me/orders');
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

  public createDateMsToDateString(order: OrderResponse): string {
    return new Date(order.createDate).toLocaleString('en-GB').slice(0, -3);
  }
}
