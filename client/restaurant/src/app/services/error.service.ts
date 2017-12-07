import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorService {

  constructor() { }

  public showError(errorResponse, snackBar: MatSnackBar): void {
    snackBar.open(errorResponse.error, undefined, {
      panelClass: 'snackBarError'
    });
  }
}
