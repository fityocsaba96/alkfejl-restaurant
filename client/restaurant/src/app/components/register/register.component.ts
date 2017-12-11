import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { City } from '../../models/city';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';
import { RestaurantService } from '../../services/restaurant.service';
import { CityService } from '../../services/city.service';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [Validators.required])
  });
  private restaurants:Restaurant[];
  private cities:City[];

  constructor(
    private restaurantService: RestaurantService,
    private cityService: CityService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(response => {
      this.restaurants=response.map(object => new Restaurant(object));
    }, response => this.notificationService.showError(response))
    this.cityService.getCities().subscribe(response => {
      this.cities=response.map(object => new City(object));
    }, response => this.notificationService.showError(response))
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get("password")
  }

  get lastname(){
    return this.registerForm.get('lastname')
  }

  get firstname(){
    return this.registerForm.get("firstname")
  }

  get address(){
    return this.registerForm.get('address')
  }

  get phonenumber(){
    return this.registerForm.get("phonenumber")
  }

  get zipcode(){
    return this.registerForm.get('zipcode')
  }


  public tryRegister(city: City, restaurant: Restaurant): void {
    this.userService.register(this.email.value,this.firstname.value,this.lastname.value,this.password.value,
      parseInt(this.zipcode.value),city,this.address.value,this.phonenumber.value,restaurant,false).subscribe((user) => {
      this.router.navigate(['/user/login']);
    }, response => this.notificationService.showError(response));
  }

  public change(city: City): void {
    this.restaurantService.getRestaurantsByCity(city).subscribe(response => {
      this.restaurants=response.map(object => new Restaurant(object));
    }, response => this.notificationService.showError(response))
  }

}
