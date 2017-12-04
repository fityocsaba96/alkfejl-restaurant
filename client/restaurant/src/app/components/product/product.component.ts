import { Component, Input } from '@angular/core';
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
  public showCategory: boolean;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {
    this.showCategory = true;
  }

  private user(): boolean {
    return UserService.role === Role.USER;
  }

  private addToCart(): void {
    this.productService.addToCart(this.product.id);
  }
}
