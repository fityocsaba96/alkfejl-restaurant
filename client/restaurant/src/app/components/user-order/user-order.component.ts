import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from '../../models/responses/order-response';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  private _pageTitle: string;
  private pageSubTitle: string;
  private order: OrderResponse;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(response => {
      this.order = new OrderResponse(response.find(object => object.id === parseInt(this.route.snapshot.paramMap.get('id'))));
      this.pageSubTitle = `Order #${this.order.id}`;
    }, response => this.notificationService.showError(response));
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
