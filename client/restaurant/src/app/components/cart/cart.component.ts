import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public pageTitle: string;
  private displayedColumns: string[];
  private dataSource: MatTableDataSource<any>;
  private tableDataLoaded: boolean;
  private totalPrice: number;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Cart';
    this.displayedColumns = ['name', 'price', 'quantity', 'delete'];
    this.dataSource = new MatTableDataSource();
    this.tableDataLoaded = false;
    this.totalPrice = 0;
  }

  ngOnInit() {
    const cartData = this.productService.getCartData(), ids = cartData.map(object => object.id), tableData = [];

    if (cartData.length > 0) {
      this.productService.getProducts().subscribe(response => {
        response.filter(object => ids.includes(object.id)).forEach((object, index) => {

          const tableRow = {
            name: object.name,
            price: object.price,
            quantity: cartData[index].quantity,
            id: cartData[index].id
          };
          tableData.push(tableRow);
          this.totalPrice += tableRow.price * tableRow.quantity;
        });
        this.dataSource.data = tableData.reverse();
        this.tableDataLoaded = true;
      }, response => this.notificationService.showError(response));
    } else {
      this.tableDataLoaded = true;
    }
  }

  private deleteFromCart(productId: number): void {
    this.productService.deleteFromCart(productId);
    this.dataSource.data.splice(this.dataSource.data.findIndex(object => object.id === productId), 1);
    this.dataSource.data = this.dataSource.data;
    this.notificationService.showSuccess('Deleted from cart!');
  }

  private placeOrder(note: string, event: Event) {
    event.preventDefault();
    this.orderService.placeOrder(this.dataSource.data, note).subscribe(response => {
      this.productService.emptyCart(this.dataSource.data.map(object => object.id));
      this.dataSource.data = [];
      this.notificationService.showSuccess('Order has been placed!');
    }, response => this.notificationService.showError(response));
  }
}
