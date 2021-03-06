import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  public pageTitle: string;
  public orders: Order[];

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'My orders';
  }

  ngOnInit() {
    this.orderService.getUserOrders().subscribe(response => {
      this.orders = response.map(object => new Order(object)).reverse();
    }, response => this.notificationService.showError(response));
  }
}
