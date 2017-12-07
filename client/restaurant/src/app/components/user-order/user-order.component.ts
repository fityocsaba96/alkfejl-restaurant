import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from '../../models/responses/order-response';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from '../../services/error.service';

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
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) {
    this._pageTitle = 'My orders';
  }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(response => {
      this.order = new OrderResponse(response.find(object => object.id === parseInt(this.route.snapshot.paramMap.get('id'))));
      this.pageSubTitle = `Order #${this.order.id}`;
    }, response => this.errorService.showError(response, this.snackBar));
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
