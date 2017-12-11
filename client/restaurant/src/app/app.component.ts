import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './services/notification.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private pageTitle: string;

  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.notificationService.success.subscribe(message => {
      this.snackBar.open(message, undefined, {
        panelClass: 'snackBarSuccess',
        duration: 3000
      });
    });

    this.notificationService.error.subscribe(errorResponse => {
      this.snackBar.open(errorResponse.error, undefined, {
        panelClass: 'snackBarError'
      });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.snackBar.dismiss();
      }
    });
  }

  onActivate(component): void {
    this.pageTitle = component.pageTitle;
  }
}
