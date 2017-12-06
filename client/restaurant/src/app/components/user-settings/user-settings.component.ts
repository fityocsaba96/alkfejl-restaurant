import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user';
import { City } from '../../models/city';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CityService } from '../../services/city.service';

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

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar
  ) {
    this._pageTitle = 'User settings';
  }

  ngOnInit() {
    this.user = UserService.user;
    this.cityService.getCities().subscribe(response => {
      this.cities = response.map(object => new City(object));
    });
    this.fetchRestaurantsByCity(this.user.city);
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  private fetchRestaurantsByCity(city: City): void {
    this.restaurantService.getRestaurantsByCity(city).subscribe(response => {
      this.restaurants = response.map(object => new Restaurant(object));
    });
  }

  private refreshRestaurants(cityId: number): void {
    this.fetchRestaurantsByCity(new City({
      id: cityId
    }));
  }

  private editSettings(email: string, password: string, firstName: string, lastName: string, zipCode: string,
                       cityId: number, address: string, phoneNumber: string, restaurantId: number, event: Event): void {
    event.preventDefault();
    this.userService.editSettings(email, password, firstName, lastName, parseInt(zipCode),
                                  cityId, address, phoneNumber, restaurantId).subscribe(response => {
      UserService.user = new User(response);
      this.snackBar.open('User settings has been updated!', 'OK', {
        duration: 3000
      });
    }, response => {
      // TODO: display error message
    });
  }
}
