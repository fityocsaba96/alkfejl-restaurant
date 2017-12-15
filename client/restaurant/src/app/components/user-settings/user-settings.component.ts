import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {

  public pageTitle: string;
  public user: User;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'User settings';
    this.user = this.userService.user;
  }

  public editSettings(user: User): void {
    this.userService.editSettings(user).subscribe(response => {
      this.userService.user = new User(response);
      this.notificationService.showSuccess('User settings has been updated!');
    }, response => this.notificationService.showError(response));
  }
}
