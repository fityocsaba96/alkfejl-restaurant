import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-order-overview',
  templateUrl: './user-order-overview.component.html',
  styleUrls: ['./user-order-overview.component.css']
})
export class UserOrderOverviewComponent {

  @Input()
  public order: Order;

  constructor(
    private orderService: OrderService
  ) { }
}
