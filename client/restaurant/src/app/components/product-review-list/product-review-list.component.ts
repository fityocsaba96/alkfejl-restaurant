import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { ReviewsResponse } from '../../models/responses/reviews-response';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/user';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.css']
})
export class ProductReviewListComponent implements OnInit {

  private reviews: ReviewsResponse;
  public pageTitle: string;
  public pageSubTitle: string;
  private starsChoices: number[];

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private router: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Reviews';
    this.starsChoices = Array(5).fill(undefined).map((e, i) => 5 - i);
  }

  ngOnInit() {
    const productId = parseInt(this.router.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByProductId(productId).subscribe(response => {
      response.reviews.reverse();
      this.reviews = new ReviewsResponse(response);
      this.pageSubTitle = this.reviews.product.name;
    }, response => this.notificationService.showError(response));
  }

  private writeReview(stars: number, description: string, event: Event) {
    event.preventDefault();
    this.reviewService.writeReview(this.reviews.product.id, stars, description).subscribe(response => {
      this.ngOnInit();
      this.notificationService.showSuccess('Review has been posted!');
    }, response => this.notificationService.showError(response));
  }
}
