import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { City } from '../../models/city';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CityService } from '../../services/city.service';
import { NotificationService } from '../../services/notification.service';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  private _pageTitle: string;
  private user: User;
  private cities: City[];
  private restaurants: Restaurant[];

  @ViewChild('restaurantId')
  private restaurantId: MatSelect;

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private restaurantService: RestaurantService,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'User settings';
  }

  ngOnInit() {
    this.user = UserService.user;
    this.cityService.getCities().subscribe(response => {
      this.cities = response.map(object => new City(object));
    }, response => this.notificationService.showError(response));
    this.fetchRestaurantsByCity(this.user.city);
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  private fetchRestaurantsByCity(city: City): void {
    this.restaurantService.getRestaurantsByCity(city).subscribe(response => {
      this.restaurants = response.map(object => new Restaurant(object));
    }, response => this.notificationService.showError(response));
  }

  private refreshRestaurants(cityId: number): void {
    this.fetchRestaurantsByCity(new City({
      id: cityId
    }));
    this.restaurantId.value = undefined;
  }

  private editSettings(email: string, password: string, firstName: string, lastName: string, zipCode: string,
                       cityId: number, address: string, phoneNumber: string, restaurantId: number, event: Event): void {
    event.preventDefault();
    this.userService.editSettings(email, password, firstName, lastName, parseInt(zipCode),
                                  cityId, address, phoneNumber, restaurantId).subscribe(response => {
      UserService.user = new User(response);
      this.notificationService.showSuccess('User settings has been updated!');
    }, response => this.notificationService.showError(response));
  }
}
