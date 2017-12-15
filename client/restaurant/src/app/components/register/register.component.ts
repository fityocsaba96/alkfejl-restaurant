import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public pageTitle: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Register';
  }

  private register(user: User): void {
    this.userService.register(user).subscribe(response => {
      this.router.navigate(['/user/login']);
      this.notificationService.showSuccess('Registration successful!');
    }, response => this.notificationService.showError(response));
  }
}
