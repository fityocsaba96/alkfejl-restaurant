import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../models/order';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [StatusService, OrderService]
})
export class OrderComponent implements OnInit {
  private statuses:Status[];
  private status:Status;
  private _pageTitle:string;

  @Input()
  public order: Order;

  constructor(
    private statusService:StatusService,
    private orderService:OrderService,
    ) {
    this._pageTitle='Orders'
   }

  ngOnInit() {
    this.statusService.getStatuses().subscribe((result) => {
      this.statuses=result.map(object=> new Status(object))
    })
  }

  public changeOrderStatus(status:object):void {
    this.status=new Status(status);
    this.order.status=this.status;
    this.orderService.update(this.order).subscribe(
      order => console.log('ok'),
      err => console.log(err)
    )
  }

}
