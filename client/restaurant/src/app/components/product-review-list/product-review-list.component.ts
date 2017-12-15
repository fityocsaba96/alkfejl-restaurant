import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { ReviewsResponse } from '../../models/responses/reviews-response';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.css']
})
export class ProductReviewListComponent implements OnInit {

  public pageTitle: string;
  public pageSubTitle: string;
  public reviews: ReviewsResponse;
  public starsChoices: number[];

  @ViewChild('reviewForm')
  private reviewForm: NgForm;

  @ViewChild('stars')
  private stars: MatSelect;

  constructor(
    public userService: UserService,
    private reviewService: ReviewService,
    private router: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.pageTitle = 'Reviews';
    this.starsChoices = Array(5).fill(undefined).map((e, i) => 5 - i);
  }

  ngOnInit() {
    const productId = Number(this.router.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByProductId(productId).subscribe(response => {
      response.reviews.reverse();
      this.reviews = new ReviewsResponse(response);
      this.pageSubTitle = this.reviews.product.name;
    }, response => this.notificationService.showError(response));
  }

  public writeReview(stars: number, description: string, event: Event) {
    event.preventDefault();
    this.reviewService.writeReview(this.reviews.product.id, stars, description).subscribe(response => {
      this.reviewForm.resetForm();
      this.stars.value = undefined;
      this.ngOnInit();
      this.notificationService.showSuccess('Review has been posted!');
    }, response => this.notificationService.showError(response));
  }
}
