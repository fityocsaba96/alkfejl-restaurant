import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (this.user() || this.admin()) {
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result.map(object => new Category(object));
      });
    }
  }

  private guest(): boolean {
    return UserService.role === Role.GUEST;
  }

  private user(): boolean {
    return UserService.role === Role.USER;
  }

  private admin(): boolean {
    return UserService.role === Role.ADMIN;
  }

  private logout():void{
    this.userService.logout();
    this.router.navigate(['/restaurants']);
  }
}
