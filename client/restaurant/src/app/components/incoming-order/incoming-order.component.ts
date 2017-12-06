import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../models/order';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status.service';
import { OrderService } from '../../services/order.service';

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
    ) { }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(response => {
      this.statuses=response.map(object=> new Status(object))
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
