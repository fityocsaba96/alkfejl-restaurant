import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from '../../models/responses/order-response';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { StatusService } from '../../services/status.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public pageTitle: string;
  public pageSubTitle: string;
  public order: OrderResponse;
  public orderCreateDate: string;
  public statuses: Status[];

  constructor(
    public userService: UserService,
    private orderService: OrderService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.pageTitle = this.userService.isAdmin ? 'Incoming orders' : 'My orders';
  }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(orderId).subscribe(response => {
      this.order = new OrderResponse(response);
      this.pageSubTitle = `Order #${String(this.order.id)}`;
      this.orderCreateDate = this.orderService.dateMsToDateString(this.order.createDate);
    }, response => this.notificationService.showError(response));

    if (this.userService.isAdmin) {
      this.statusService.getStatuses().subscribe(response => {
        this.statuses = response.map(object => new Status(object));
      }, response => this.notificationService.showError(response));
    }
  }

  public changeStatus(statusId: number): void {
    this.orderService.update(this.order.id, statusId).subscribe(response => {
      this.order.status = this.statuses.find(status => status.id === statusId);
      this.notificationService.showSuccess('Changed status!');
    }, response => this.notificationService.showError(response));
  }
}
