import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptorService implements HttpInterceptor {
  constructor() {}

  // public intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
  //   return next.handle(req);
  // }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap((resp: HttpResponse<any>) => this.auditEvent(resp, startTime))
    );
  }

  private auditEvent(resp: HttpResponse<any>, startTime: number) {
    const elapsedMs = Date.now() - startTime;
    const eventMessage = resp.statusText + ' on ' + resp.url;
    const message = eventMessage + ' in ' + elapsedMs + 'ms';
    console.log(message);
  }
}
