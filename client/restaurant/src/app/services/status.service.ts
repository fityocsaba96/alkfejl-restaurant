import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Status } from '../models/status';

@Injectable()
export class StatusService {

  constructor(
    private http: HttpClient
  ) { }

  public getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>('/api/statuses');
  }
}
