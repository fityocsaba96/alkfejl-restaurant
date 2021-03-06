import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public categories: Category[];

  constructor(
    public userService: UserService,
    private categoryService: CategoryService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.userService.isUser || this.userService.isAdmin) {
      this.fetchCategories();
    }
    this.userService.loggedIn.subscribe(() => this.fetchCategories());
  }

  private fetchCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.map(object => new Category(object));
    }, response => this.notificationService.showError(response));
  }

  public logOut(): void {
    this.userService.logOut().subscribe(response => {
      this.userService.setLoggedOut();
      this.router.navigate(['/restaurants']);
      this.notificationService.showSuccess('Logout successful!');
    }, response => this.notificationService.showError(response));
  }
}
