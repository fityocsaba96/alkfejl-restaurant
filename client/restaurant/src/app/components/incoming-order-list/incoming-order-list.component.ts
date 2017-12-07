import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-incoming-order-list',
  templateUrl: './incoming-order-list.component.html',
  styleUrls: ['./incoming-order-list.component.css']
})
export class IncomingOrderListComponent implements OnInit {

  private orders: Order[];
  private _pageTitle:string;

  constructor(
    private orderService:OrderService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) {
    this._pageTitle='Incoming orders';
   }

  ngOnInit() {
    this.orderService.getIncomingOrders().subscribe(response => {
      this.orders=response.map(object => new Order(object))
    }, response => this.errorService.showError(response, this.snackBar))
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
