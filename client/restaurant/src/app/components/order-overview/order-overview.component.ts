import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.css']
})
export class OrderOverviewComponent implements OnInit {

  @Input()
  public order: Order;

  private orderCreateDate: string;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderCreateDate = this.orderService.dateMsToDateString(this.order.createDate);
  }
}
