import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/responses/order-response';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  private orders: OrderResponse[];
  private _pageTitle: string;

  constructor(
    private orderService: OrderService
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit() {
    this.orderService.getUserOrders().subscribe(response => {
      this.orders = response.map(object => new OrderResponse(object));
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
