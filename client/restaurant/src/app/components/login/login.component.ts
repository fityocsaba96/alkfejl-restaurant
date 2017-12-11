import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  private _pageTitle: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { 
    this._pageTitle="Log in"
  }

  ngOnInit() {
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get("password")
  }
  private tryLogin(): void {
    this.userService.login(this.email.value,this.password.value).subscribe((user) => {
      console.log(user); 
      UserService.user = user as User;
      this.userService.syncLoginStatus();
      this.router.navigate(['/restaurants']);
      this.userService.notifyLoggedIn();
    }, response => this.notificationService.showError(response));
} 
}
