import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  private error: boolean;
  private _pageTitle: string;
  private errorString: string;

  constructor(
    private userService: UserService,
    private router: Router
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
      this.userService.setUser(user as User);
      this.userService.syncLoginStatus();
      this.router.navigate(['/restaurants']);
    }, (err) => {
      if (err.status === 400) {
        this.error = true;
        this.errorString=err.error.error;
      }
    });
} 
}
