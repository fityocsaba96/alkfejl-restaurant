import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  private _pageTitle: string;
  private pageSubTitle: string;
  private order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(result => {
      this.order = new Order(result.find(object => object.id === parseInt(this.route.snapshot.paramMap.get('id'))));
      this.pageSubTitle = `Order #${this.order.id}`;
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
