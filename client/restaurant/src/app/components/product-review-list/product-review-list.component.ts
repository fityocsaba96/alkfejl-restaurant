import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { ReviewsResponse } from '../../models/responses/reviews-response';

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrls: ['./product-review-list.component.css']
})
export class ProductReviewListComponent implements OnInit {

  private reviews: ReviewsResponse;
  private _pageTitle: string;
  private pageSubTitle: string;

  constructor(
    private reviewService: ReviewService,
    private router: ActivatedRoute
  ) {
    this._pageTitle = 'Reviews';
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
}
