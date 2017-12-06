import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { ReviewsResponse } from '../../models/responses/reviews-response';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.css']
})
export class ProductReviewListComponent implements OnInit {

  private reviews: ReviewsResponse;
  private _pageTitle: string;
  private pageSubTitle: string;
  private starsChoices: number[];

  constructor(
    private reviewService: ReviewService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this._pageTitle = 'Reviews';
    this.starsChoices = Array(5).fill(undefined).map((e, i) => 5 - i);
  }

  ngOnInit() {
    const productId = parseInt(this.router.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByProductId(productId).subscribe(response => {
      this.reviews = new ReviewsResponse(response);
      this.pageSubTitle = this.reviews.product.name;
    });
  }

  public get pageTitle() {
    return this._pageTitle;
  }

  private user(): boolean {
    return UserService.role === Role.USER;
  }

  private writeReview(stars: number, description: string, event: Event) {
    event.preventDefault();
    this.reviewService.writeReview(this.reviews.product.id, stars, description).subscribe(response => {
      this.ngOnInit();
      this.snackBar.open('Review has been posted!', 'OK', {
        duration: 3000
      });
    }, response => {
      // TODO: display error message
    });
  }
}
