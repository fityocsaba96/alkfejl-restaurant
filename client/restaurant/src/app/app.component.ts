import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  public title: String = 'Restaurant';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.syncLoginStatus();
  }
}
