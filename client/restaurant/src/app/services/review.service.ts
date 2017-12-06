import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReviewsResponse, ReviewResponse } from '../models/responses/reviews-response';
import { Review } from '../models/review';

@Injectable()
export class ReviewService {

  constructor(
    private http: HttpClient
  ) { }

  public getReviewsByProductId(id: number): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(`/api/product/${id.toString()}/reviews`);
  }

  public createDateMsToDateString(review: ReviewResponse): string {
    return new Date(review.createDate).toLocaleString('en-GB').slice(0, -3);
  }

  public writeReview(productId: number, stars: number, description: string): Observable<Review> {
    return this.http.post<Review>(`/api/product/${productId.toString()}/review`, {
      stars,
      description
    });
  }
}
