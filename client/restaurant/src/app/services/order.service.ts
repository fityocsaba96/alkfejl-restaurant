import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';
import { OrderResponse } from '../models/responses/order-response';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  public getIncomingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders/incoming');
  }

  public getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/user/me/orders');
  }

  public getOrderById(id: number): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`/api/order/${String(id)}`);
  }

  public update(id: number, statusId: number): Observable<Order> {
    return this.http.put<Order>(`/api/order/${String(id)}`, {
      id,
      status: statusId ? {
        id: statusId
      } : undefined
    });
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

  public dateMsToDateString(date: number): string {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
