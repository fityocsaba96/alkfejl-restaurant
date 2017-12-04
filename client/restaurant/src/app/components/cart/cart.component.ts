import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private _pageTitle: string;
  private displayedColumns: string[];
  private dataSource: MatTableDataSource<any>;
  private tableDataLoaded: boolean;

  constructor(
    private productService: ProductService
  ) {
    this._pageTitle = 'Cart';
    this.displayedColumns = ['name', 'price', 'quantity', 'delete'];
    this.dataSource = new MatTableDataSource();
    this.tableDataLoaded = false;
  }

  ngOnInit() {
    const cartData = this.getCartData(), ids = cartData.map(object => object.id), tableData = [];

    this.productService.getProducts().subscribe(result => {
      result.filter(object => ids.includes(object.id)).forEach((object, index) => {
        tableData.push({
          name: object.name,
          price: object.price,
          quantity: cartData[index].quantity,
          id: cartData[index].id
        });
      });
      this.dataSource.data = tableData;
      this.tableDataLoaded = true;
    });
  }

  private getCartData() {
    const cartData = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key: string = window.sessionStorage.key(i);

      if (key.substr(0, 7) === 'cartQty') {
        cartData.push({
          id: parseInt(key.substr(7)),
          quantity: parseInt(window.sessionStorage.getItem(key))
        });
      }
    }
    return cartData.sort((a, b) => a.id - b.id);
  }

  private deleteFromCart(productId: number): void {
    this.productService.deleteFromCart(productId);
    this.dataSource.data.splice(this.dataSource.data.findIndex(object => object.id === productId), 1);
    this.dataSource.data = this.dataSource.data;
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
