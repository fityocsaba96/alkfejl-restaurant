import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input()
  public product: Product;

  @Input()
  public showCategory?: boolean;

  @Output()
  public clickAddToCart: EventEmitter<number>;

  constructor() {
    this.showCategory = true;
    this.clickAddToCart = new EventEmitter();
  }

  private user(): boolean {
    return UserService.role === Role.USER;
  }

  private addToCart(): void {
    this.clickAddToCart.emit(this.product.id);
  }

  private admin(): boolean {
    return UserService.role === Role.ADMIN;
  }

  @Output()
  public delProduct: EventEmitter<Product> = new EventEmitter();

  public clickButton($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.delProduct.emit(this.product);

  }
}
