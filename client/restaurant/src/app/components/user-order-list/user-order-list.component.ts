import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/responses/order-response';
import { ErrorService } from '../../services/error.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  private orders: OrderResponse[];
  private _pageTitle: string;

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit() {
    this.orderService.getUserOrders().subscribe(response => {
      this.orders = response.map(object => new OrderResponse(object));
    }, response => this.errorService.showError(response, this.snackBar));
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
