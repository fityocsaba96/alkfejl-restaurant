import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public pageTitle: string;
  public categories: Category[];

  @ViewChild('addProductForm')
  private addProductForm: NgForm;

  @ViewChild('categoryId')
  private categoryId: MatSelect;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Add product';
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.map(object => new Category(object));
    }, response => this.notificationService.showError(response));
  }

  public addProduct(name: string, description: string, price: string, categoryId: number, event: Event): void {
    event.preventDefault();
    this.productService.addProduct(name, description, price, categoryId).subscribe(response => {
      this.addProductForm.resetForm();
      this.categoryId.value = undefined;
      this.notificationService.showSuccess('Product has been added!');
    }, response => this.notificationService.showError(response));
  }
}
