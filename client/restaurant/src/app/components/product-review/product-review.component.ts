import { Component, OnInit, Input } from '@angular/core';
import { ReviewResponse } from '../../models/responses/reviews-response';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  @Input()
  public review: ReviewResponse;

  private stars: any[];

  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.stars = Array(this.review.stars);
  }
}
