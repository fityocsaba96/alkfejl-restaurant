import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: Product[];
  private _pageTitle: string;
  private idx:number;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'Products';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.map(object => new Product(object));
    }, response => this.notificationService.showError(response));
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  public delProduct(product:Product): void {
    this.productService.delProductById(product.id).subscribe(response => {
      this.idx=this.products.indexOf(product);
      this.products.splice(this.idx,1);
    }, response => this.notificationService.showError(response));
  }

  private addToCart(id: number): void {
    this.productService.addToCart(id);
    this.notificationService.showSuccess('Added to cart');
  }
}
