import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsStoreService } from './notifications-store.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private notificationsStoreService: NotificationsStoreService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(err) {
    const unauthorized_code = 401;
    let userMessage = 'Fatal error';
    if (err instanceof HttpErrorResponse) {
      if (err.status === unauthorized_code) {
        userMessage = 'Authorization needed';
      } else {
        userMessage = 'Comunications error';
      }
    }
    this.notificationsStoreService.dispatch({ note: userMessage });
    return throwError(err);
  }
}
