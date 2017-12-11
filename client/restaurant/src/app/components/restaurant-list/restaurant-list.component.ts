import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  private restaurants: Restaurant[];
  private _pageTitle: string;

  constructor(
    private restaurantService: RestaurantService,
    private notificationService: NotificationService
  ) {
    this._pageTitle = 'Restaurants';
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(response => {
      this.restaurants = response.map(object => new Restaurant(object));
    }, response => this.notificationService.showError(response));
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
