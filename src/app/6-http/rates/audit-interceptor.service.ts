import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptorService implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => this.auditEvent(event, startTime)));
  }

  private auditEvent(event: HttpEvent<any>, startTime: number) {
    if (event instanceof HttpResponse) {
      const elapsedMs = Date.now() - startTime;
      const eventMessage = event.statusText + ' on ' + event.url;
      const message = eventMessage + ' in ' + elapsedMs + 'ms';
      console.log(message);
    }
  }
}
