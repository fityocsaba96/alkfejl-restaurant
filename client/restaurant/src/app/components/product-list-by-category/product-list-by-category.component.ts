import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-list-by-category',
  templateUrl: './product-list-by-category.component.html',
  styleUrls: ['./product-list-by-category.component.css']
})
export class ProductListByCategoryComponent implements OnInit {

  private products: Product[];
  private _pageTitle: string;
  private pageSubTitle: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this._pageTitle = 'Products';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initializeComponent(parseInt(params['id']));
    });
  }

  private initializeComponent(categoryId: number): void {
    this.products = this.pageSubTitle = undefined;
    this.categoryService.getCategories().subscribe(result => {
      this.pageSubTitle = result.find(object => object.id === categoryId).name;
    });
    this.productService.getProductsByCategory(categoryId).subscribe(result => {
      this.products = result.map(object => new Product(object));
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  private addToCart(id: number): void {
    this.productService.addToCart(id);
    this.snackBar.open('Added to cart', 'OK', {
      duration: 3000
    });
  }
}
