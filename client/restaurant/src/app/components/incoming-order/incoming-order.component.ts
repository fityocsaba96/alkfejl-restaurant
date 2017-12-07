import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../models/order';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-incoming-order',
  templateUrl: './incoming-order.component.html',
  styleUrls: ['./incoming-order.component.css']
})
export class IncomingOrderComponent implements OnInit {
  private statuses:Status[];
  private status:Status;

  @Input()
  public order: Order;

  constructor(
    private statusService:StatusService,
    private orderService:OrderService,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
    ) { }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(response => {
      this.statuses=response.map(object=> new Status(object))
    }, response => this.errorService.showError(response, this.snackBar))
  }

  public changeOrderStatus(status:object):void {
    this.status=new Status(status);
    this.order.status=this.status;
    this.orderService.update(this.order).subscribe(
      order => console.log('ok'),
      response => this.errorService.showError(response, this.snackBar)
    )
  }

}
