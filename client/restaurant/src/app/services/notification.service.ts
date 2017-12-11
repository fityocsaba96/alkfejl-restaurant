import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  private _success: Subject<any>;
  private _error: Subject<any>;

  constructor() {
    this._success = new Subject();
    this._error = new Subject();
  }

  public get success(): Subject<any> {
    return this._success;
  }

  public get error(): Subject<any> {
    return this._error;
  }

  public showSuccess(success): void  {
    this._success.next(success);
  }

  public showError(error): void {
    this._error.next(error);
  }
}
