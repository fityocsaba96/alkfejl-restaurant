import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-incoming-order-list',
  templateUrl: './incoming-order-list.component.html',
  styleUrls: ['./incoming-order-list.component.css']
})
export class IncomingOrderListComponent implements OnInit {

  private _pageTitle: string;
  private orders: Order[];

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'Incoming orders';
   }

  ngOnInit() {
    this.orderService.getIncomingOrders().subscribe(response => {
      this.orders = response.map(object => new Order(object)).reverse();
    }, response => this.notificationService.showError(response));
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
