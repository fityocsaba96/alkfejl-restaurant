import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: Product[];
  private _pageTitle: string;

  constructor(
    private productService: ProductService
  ) {
    this._pageTitle = 'Products';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result.map(object => new Product(object));
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
