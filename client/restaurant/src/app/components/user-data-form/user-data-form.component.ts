import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { City } from '../../models/city';
import { Restaurant } from '../../models/restaurant';
import { MatSelect } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { CityService } from '../../services/city.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit {

  @Input()
  public user?: User;

  @Output()
  public clickDone: EventEmitter<User>;

  @ViewChild('restaurantId')
  private restaurantId: MatSelect;

  public cities: City[];
  public restaurants: Restaurant[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cityService: CityService,
    private restaurantService: RestaurantService,
    private notificationService: NotificationService
  ) {
    this.clickDone = new EventEmitter();
  }

  ngOnInit() {
    this.cityService.getCities().subscribe(response => {
      this.cities = response.map(object => new City(object));
    }, response => this.notificationService.showError(response));

    if (this.user) {
      this.fetchRestaurantsByCity(this.user.city);
    } else {
      this.restaurants = [];
    }
  }

  private fetchRestaurantsByCity(city: City): void {
    this.restaurantService.getRestaurantsByCity(city).subscribe(response => {
      this.restaurants = response.map(object => new Restaurant(object));
    }, response => this.notificationService.showError(response));
  }

  public refreshRestaurants(cityId: number): void {
    this.fetchRestaurantsByCity(new City({
      id: cityId
    }));
    this.restaurantId.value = undefined;
  }

  public done(email: string, password: string, firstName: string, lastName: string, zipCode: string,
               cityId: number, address: string, phoneNumber: string, restaurantId: number, event: Event): void {
    event.preventDefault();
    this.clickDone.emit(this.userService.userFormDataToUser(email, password, firstName, lastName, zipCode,
                                                            cityId, address, phoneNumber, restaurantId));
  }
}
