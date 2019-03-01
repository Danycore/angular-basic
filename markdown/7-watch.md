title: 7-watch
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Vigilancia y seguridad en Angular

---

# 1. Uso de observables para monitorizar datos

# 2. Uso de interceptores para gestionar errores

# 3. Un notificador de problemas

---

class: impact

# 1. Uso de observables para monitorizar datos

## Productores de observables

## Un Store de notificaciones

## Desacoplados pero conectados

---

El módulo de notificaciones

```console
ng g m notifications --routing true
ng g c notifications/sender
ng g c notifications/receiver
```

`app-routing.module.ts`

```typescript
{
  path: 'notifications',
  loadChildren: './notifications/notifications.module#NotificationsModule'
},
```

---

`notifications-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: 'sender',
    component: SenderComponent
  },
  {
    path: 'receiver',
    component: ReceiverComponent
  },
  {
    path: '**',
    redirectTo: 'sender'
  }
];
```

`header.component.html`

```html
<a routerLink="notifications" class="button">Notifications</a>
```

---

## 1.1 Productores de observables

### Of from interval

```typescript
const data = {name:'', value:0};
// To do of...
// To do from...
// To do interval...
```

--

### Subject y BehaviorSubject

```typescript
const data = {name:'', value:0};
const data_after_subscribe$ = new Subject<any>();
const data_initialize_replay$ =
  new Subject<any>().pipe(startWith(this.data), shareReplay(1));
const data_behavior$ = new BehaviorSubject<any>(this.data);
```

---

## 1.2 Un Store de notificaciones

```console
ng g s notifications/notificationsStore
```

```typescript
export class NotificationsStoreService {
  private notifications = [];

  private notifications$ = new BehaviorSubject<any[]>([]);
  // private notifications$ = new Subject<any[]>();

  constructor() {}

  public select$ = () => this.notifications$.asObservable();

  public sendNotification(notification) {
    this.notifications = [...this.notifications, notification];
    this.notifications$.next(this.notifications);
  }
}
```

---

## 1.3 Desacoplados pero conectados

### Emisión

Vista con un formulario para enviar mensajes

```html
<h2>
  Notes sender
</h2>
<form>
  <fieldset>
    <section>
      <label for="note">Note</label>
      <input name="note"
             [(ngModel)]="note" />
    </section>
  </fieldset>
  <button (click)="send()">Send</button>
</form>
<a [routerLink]="['../receiver']">Go to receiver</a>
```
---

Dependencia y uso del servicio del almacén de notificaciones

```typescript
export class SenderComponent implements OnInit {
  public note = '';

  constructor(private notificationsStore: NotificationsStoreService) {}

  ngOnInit() {}

  public send() {
    this.notificationsStore.sendNotification(this.note);
  }
}
```
---

### Recepción

Listado de notificaciones, no importa el orden de subscripción

```html
<h2>
  Notes receiver
</h2>
<ul>
  <li *ngFor="let note of notes$ | async">{{ note | json }}</li>
</ul>
<a [routerLink]="['../sender']">Go to sender</a>
```

---

Dependencia y uso del servicio del almacén de notificaciones

```typescript
export class ReceiverComponent implements OnInit {
  public notes$;

  constructor(private notificationsStore: NotificationsStoreService) {}

  ngOnInit() {
    this.notes$ = this.notificationsStore.select$();
  }
}
```

---

> Recap:

# 1. Uso de observables para monitorizar datos

## Productores de observables

## Un Store de notificaciones

## Desacoplados pero conectados

---

class: impact

# 2. Observables

## Async

## pipe

## operators

---

```
ng g c rates/obserates
{
  path: 'observables',
  component: ObseratesComponent
}
<p><a [routerLink]="['observables']">Observables</a></p>
```

---

## 2.1 Async

### Tuberías de Angular |

```html
<h2> Currency Observable Rates. </h2>
<h3> From Euro to the $ world </h3>
<pre>{{ currentEuroRates$ | async | json }}</pre>
```

> Recibe un observable, se suscribe, y devuelve el dato cuando llegue.

---

En el controlador se exponen Observables

```typeScript
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
* public currentEuroRates$: Observable<any> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
*   this.currentEuroRates$ = this.httpClient.get(url);
  }
```
> No es necesaria la suscripción en código

---

## 2.2 Pipe

### Tuberías en RxJS .pipe()

```typescript
public myRates$: Observable<any[]> = null;
private getCurrentEuroRates() {
  const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
  this.currentEuroRates$ = this.httpClient.get(url);
* this.myRates$ = this.currentEuroRates$.pipe(map(this.transformData));
}
private transformData(currentRates) {
  const current = currentRates.rates;
  return Object.keys(current).map(key => ({
    date: currentRates.date,
    currency: key,
    euros: current[key]
  }));
}
```

---

## 2.3 Operators

```html
<pre>{{ myRates$ | async | json }}</pre>
```
El consumo sigue igual... pero...

--

```typescript
private getCurrentEuroRates() {
const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
  this.currentEuroRates$ = this.httpClient.get(url)
*     .pipe(share());
  this.myRates$ = this.currentEuroRates$
      .pipe(
*       tap(d=>console.log(d)),
        map(this.transformData),
        tap(t=>console.log(t))
      );
}
```

---

> Recap:

# 2. Observables

## Async

## pipe

## operators

---

class: impact

# 3. Interceptores

## La interfaz HttpInterceptor

## Inversión del control vía token

## Un auditor de llamadas

---

```console
ng g s rates/AuditInterceptor
```

Hay que crear un servicio inyectable y hacerle cumplir una Interfaz

---

## 3.1 La interfaz HttpInterceptor

```typescript
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest }
  from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditInterceptorService implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler )
    : Observable<HttpEvent<any>> {
    // throw new Error( 'Method not implemented.' );
    return next.handle(req);
  }

  constructor() { }
}
```
---

## 3.2 Inversión del control vía token

> 1. Quitamos el `providedIn: 'root'`

> 2. Tomamos el control de la inyección

```TypeScript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuditInterceptorService,
    multi: true
  }
]
```

El `HttpClient` en su constructor reclama `HTTP_INTERCEPTORS`, un array de múltiples dependencias

Le damos nuestro interceptor para que lo agregue a su array

---

## 3.3 Un auditor de llamadas

```Typescript
export class AuditInterceptorService implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler){
    const started = Date.now();
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      tap((resp: HttpResponse<any>) => this.auditEvent(resp, started))
    );
  }

  private auditEvent(resp: HttpResponse<any>, started: number) {
    const elapsedMs = Date.now() - started;
    const eventMessage = resp.statusText + ' on ' + resp.url;
    const message = eventMessage + ' in ' + elapsedMs + 'ms';
    console.log(message);
  }
}
```

---

> Recap:

# 3. Interceptores

## La interfaz HttpInterceptor

## Inversión del control vía token

## Un auditor de llamadas
---

> Next:

# Vigilancia y seguridad en Angular

## Uso de observables para monitorizar datos

## Uso de interceptores para gestionar errores

## Un notificador de problemas

> **Blog de apoyo:** [Comunicaciones Http en Angular](https://academia-binaria.com/comunicaciones-http-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
