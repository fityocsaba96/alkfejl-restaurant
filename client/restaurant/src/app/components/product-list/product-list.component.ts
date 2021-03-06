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

  public pageTitle: string;
  public products: Product[];

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Products';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.map(object => new Product(object)).reverse();
    }, response => this.notificationService.showError(response));
  }

  public deleteProduct(product: Product): void {
    this.productService.deleteProductById(product.id).subscribe(response => {
      this.products.splice(this.products.indexOf(product), 1);
      this.notificationService.showSuccess('Product deleted!');
    }, response => this.notificationService.showError(response));
  }

  public addToCart(id: number): void {
    this.productService.addToCart(id);
    this.notificationService.showSuccess('Added to cart!');
  }
}
