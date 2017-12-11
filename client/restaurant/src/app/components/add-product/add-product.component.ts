import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private categories: Category[];
  private _pageTitle: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'Add product';
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.map(object => new Category(object));
    }, response => this.notificationService.showError(response));
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  public addProduct(name: string, description: string, price: string, categoryId: number, event: Event): void {
    event.preventDefault();
    this.productService.addProduct(name, description, price, categoryId).subscribe(response => {
      this.notificationService.showSuccess('Product has been added!');
    }, response => this.notificationService.showError(response));
  }
}
