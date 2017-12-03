import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  private pageTitle: string;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.syncLoginStatus();
  }

  onActivate(component): void {
    this.pageTitle = component.pageTitle;
  }
}
