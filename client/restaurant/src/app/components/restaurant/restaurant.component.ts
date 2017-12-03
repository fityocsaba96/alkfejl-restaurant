import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

  @Input()
  public restaurant: Restaurant;

  constructor() { }
}
