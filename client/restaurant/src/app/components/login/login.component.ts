import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public pageTitle: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Log in';
  }

  private logIn(email: string, password: string, event: Event): void {
    event.preventDefault();
    this.userService.logIn(email, password).subscribe(response => {
      this.userService.setLoggedIn(new User(response));
      this.router.navigate(['/restaurants']);
      this.notificationService.showSuccess('Login successful!');
    }, response => this.notificationService.showError(response));
  }
}
