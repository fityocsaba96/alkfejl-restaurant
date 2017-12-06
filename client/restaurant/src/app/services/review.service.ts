import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReviewsResponse, ReviewResponse } from '../models/responses/reviews-response';

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
}
