import { Component, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/responses/order-response';

@Component({
  selector: 'app-user-order-overview',
  templateUrl: './user-order-overview.component.html',
  styleUrls: ['./user-order-overview.component.css']
})
export class UserOrderOverviewComponent {

  @Input()
  public order: OrderResponse;

  constructor(
    private orderService: OrderService
  ) { }
}
