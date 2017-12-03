import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [CategoryService]
})
export class MenuComponent implements OnInit {

  private categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.sharedLoginInfoRequest.subscribe(response => {
      this.categoryService.getCategories().subscribe(result => {
        this.categories = result.map(object => new Category(object));
      });
    }, () => {});
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
}
