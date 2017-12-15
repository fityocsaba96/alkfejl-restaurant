import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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

  @Output()
  public clickDeleteProduct: EventEmitter<Product>;

  constructor(
    public userService: UserService,
    private dialog: MatDialog
  ) {
    this.showCategory = true;
    this.clickAddToCart = new EventEmitter();
    this.clickDeleteProduct = new EventEmitter();
  }

  public addToCart(): void {
    this.clickAddToCart.emit(this.product.id);
  }

  public deleteProduct(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: false
    }).beforeClose().subscribe(confirmed => {
      if (confirmed) {
        this.clickDeleteProduct.emit(this.product);
      }
    });
  }
}
