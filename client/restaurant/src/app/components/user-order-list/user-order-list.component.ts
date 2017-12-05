import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  private orders: Order[];
  private _pageTitle: string;

  constructor(
    private orderService: OrderService
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit() {
    this.orderService.getUserOrders().subscribe(result => {
      this.orders = result.map(object => new Order(object));
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
