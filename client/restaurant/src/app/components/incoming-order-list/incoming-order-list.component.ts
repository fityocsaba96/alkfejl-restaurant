import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-incoming-order-list',
  templateUrl: './incoming-order-list.component.html',
  styleUrls: ['./incoming-order-list.component.css'],
  providers:[OrderService]
})
export class IncomingOrderListComponent implements OnInit {

  private orders: Order[];
  private _pageTitle:string;

  constructor(
    private orderService:OrderService
  ) {
    this._pageTitle='Incoming orders';
   }

  ngOnInit() {
    this.orderService.getOrders().subscribe(result => {
      this.orders=result.map(object => new Order(object))
    })
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
