import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list-by-category',
  templateUrl: './product-list-by-category.component.html',
  styleUrls: ['./product-list-by-category.component.css']
})
export class ProductListByCategoryComponent implements OnInit {

  private products: Product[];
  public pageTitle: string;
  public pageSubTitle: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Products';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initializeComponent(parseInt(params['id']));
    });
  }

  private initializeComponent(categoryId: number): void {
    this.products = this.pageSubTitle = undefined;
    this.categoryService.getCategories().subscribe(response => {
      this.pageSubTitle = response.find(object => object.id === categoryId).name;
    }, response => this.notificationService.showError(response));

    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.map(object => new Product(object)).reverse();
    }, response => this.notificationService.showError(response));
  }

  private deleteProduct(product: Product): void {
    this.productService.deleteProductById(product.id).subscribe(response => {
      this.products.splice(this.products.indexOf(product), 1);
      this.notificationService.showSuccess('Product deleted!');
    }, response => this.notificationService.showError(response));
  }

  private addToCart(id: number): void {
    this.productService.addToCart(id);
    this.notificationService.showSuccess('Added to cart!');
  }
}
