import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ApiInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({url: environment.baseUrl + req.url});

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const msg = error.error?.message || error.message;
        this.snackBar.open(msg, '', {duration: 3000, panelClass: 'error-snackbar'});
        return throwError(msg);
      })
    );
  }
}
