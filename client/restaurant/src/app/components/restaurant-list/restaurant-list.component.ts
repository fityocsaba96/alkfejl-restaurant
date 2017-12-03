import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  providers: [RestaurantService]
})
export class RestaurantListComponent implements OnInit {

  private restaurants: Restaurant[];
  private _pageTitle: string;

  constructor(
    private restaurantService: RestaurantService
  ) {
    this._pageTitle = 'Restaurants';
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(result => {
      this.restaurants = result.map(object => new Restaurant(object));
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }
}
