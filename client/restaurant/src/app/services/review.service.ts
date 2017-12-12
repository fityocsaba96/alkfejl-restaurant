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

  public dateMsToDateString(date: number): string {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  public writeReview(productId: number, stars: number, description: string): Observable<Review> {
    return this.http.post<Review>(`/api/product/${productId.toString()}/review`, {
      stars,
      description
    });
  }
}
