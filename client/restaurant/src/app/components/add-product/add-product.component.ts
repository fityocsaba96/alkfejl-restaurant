import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  private categories:Category[];
  private category:Category;
  private _pageTitle:string;
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  });

  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private errorService: ErrorService
  ) { 
    this._pageTitle="Add new product"
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories=response.map(object => new Category(object));
    }, response => this.errorService.showError(response, this.snackBar))
  }

  get description(){
    return this.addProductForm.get('description')
  }

  get name(){
    return this.addProductForm.get("name")
  }
  get price(){
    return this.addProductForm.get('price')
  }

  public addProduct(category:object) : void{
    this.category=new Category(category)
    this.productService.addProduct(this.name.value,this.category,this.description.value,this.price.value).subscribe((product) =>{
      this.router.navigate(['/products']);
    }, response => this.errorService.showError(response, this.snackBar));
  }
}
