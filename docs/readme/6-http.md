title: 6-http
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Comunicaciones http en Angular

---

# 1. El servicio HttpClient

# 2. Observables

# 3. Interceptores

---

class: impact

# 1. El servicio HttpClient

## Importación y declaración de servicios

## Obtención de datos

## Envío de datos

## Actualización de datos

---

El módulo de comunicaciones

```console
ng g m rates --routing true
ng g c rates/rates
```

`app-routing.module.ts`

```typescript
{
  path: 'rates',
  loadChildren: () => import('./6-http/rates/rates.module').then(m => m.RatesModule)
},
```

---

`rates-routing.module.ts`

```typescript
{
  path: '',
  component: RatesComponent
}
```

`header.component.html`

```html
<a routerLink="rates" class="button">
  <span> Rates</span>
</a>
```

---

## 1.1 Importación y declaración de servicios

### Importación

```typescript
*import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RatesComponent],
* imports: [HttpClientModule]
})
export class RatesModule { }
```

---

### Dependencia

```typescript
*import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styles: []
})
export class RatesComponent implements OnInit {
* constructor(private httpClient: HttpClient) {}

  ngOnInit() {}
}
```

---

## 1.2 Obtención de datos

```typescript
export class RatesComponent implements OnInit {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates: any = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    this.httpClient
*     .get<ExchangeRates>(url)
      .subscribe(apiResult => (this.currentEuroRates = apiResult));
  }
}
```

---

> tipos de datos


```typescript
export interface ExchangeRates {
  base: string;
  rates: Rates;
  date: string;
}
export interface Rates {
  CHF: number;
  USD: number;
  JPY: number;
  GBP: number;
}
export interface RateByDate {
  date: string;
  currency: string;
  euros: number;
  _id?: string;
}
```
---

### Presentación en vista

```html
<h2> Currency Rates. </h2>
<h3> From Euro to the world </h3>
<pre>{{ currentEuroRates | json }}</pre>
```

---

## 1.3 Envío de datos

```typescript
export class RatesComponent implements OnInit {
  private ratesByDateApi = 'https://api-base.herokuapp.com/api/pub/rates';

  public postRatesByDate() {
    const ratesByDate: RateByDate[] = this.transformExchangeRates();
    ratesByDate.forEach(rate =>
      this.httpClient.post<RateByDate>(this.ratesByDateApi, rate).subscribe()
    );
  }

  private transformExchangeRates(): RateByDate[] {
    const currentDate = this.currentEuroRates.date;
    const currentRates = this.currentEuroRates.rates;
    const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
    return ratesByDate;
  }
}
```
---

### Presentación en vista

```html
<input value="Save Rates" type="button" (click)="postRatesByDate()" />
```

---

## 1.4 Actualización de datos

### Refresco

```typescript
export class RatesComponent implements OnInit {
 private ratesByDateApi = 'https://api-base.herokuapp.com/api/pub/rates';
 public ratesByDate: RateByDate[] = null;


 public getRatesByDate() {
    this.httpClient
      .get<RateByDate[]>(this.ratesByDateApi)
      .subscribe(apiResult => (this.ratesByDate = apiResult));
  }
}
```

```html
<input value="Refresh" type="button" (click)="getRatesByDate()" />
<pre>{{ ratesByDate | json }}</pre>
```

---

### Borrado

```typescript
  public deleteRatesByDate() {
    this.httpClient.delete(this.ratesByDateApi).subscribe();
  }
```

```html
<input value="Delete Rates by Date" type="button" (click)="deleteRatesByDate()" />
```

---

> Recap:

# 1. El servicio HttpClient

## Importación y declaración de servicios

## Obtención de datos

## Envío de datos

## Actualización de datos

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
* public currentEuroRates$: Observable<ExchangeRates> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
*   this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url);
  }
```
> No es necesaria la suscripción en código

---

## 2.2 Pipe

### Tuberías en RxJS .pipe()

```typescript
*public myRates$: Observable<MyRate[]> = null;
private getCurrentEuroRates() {
  const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
  this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url);
* this.ratesByDate$ = this.currentEuroRates$.pipe(map(this.transformData));
}
private transformData(exchangeRates: ExchangeRates): RateByDate[] {
  const currentDate = exchangeRates.date;
  const currentRates = exchangeRates.rates;
  const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
    date: currentDate,
    currency: keyRate,
    euros: currentRates[keyRate]
  }));
  return ratesByDate;
}
```

---

## 2.3 Operators

```html
<pre>{{ ratesByDate$ | async | json }}</pre>
```
El consumo sigue igual... pero...

--

```typescript
private getCurrentEuroRates() {
const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
  this.currentEuroRates$ = this.httpClient.get(url)
*     .pipe(share());
  this.ratesByDate$ = this.currentEuroRates$
      .pipe(map(this.transformData));
}
private getEuroRatesPlus() {
  const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
  this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url)
*   .pipe(share());
  this.ratesByDate$ = this.currentEuroRates$
*   .pipe(
      tap(d => console.log(d)),
      map(this.transformData),
      tap(t => console.log(t))
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
    return next.handle(req)
*     .pipe(
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

# [Vigilancia y seguridad en Angular](https://academiabinaria.github.io/angular-basic/readme/7-watch.html)

## Uso de observables para monitorizar datos

## Uso de interceptores para gestionar errores

## Un notificador de problemas

> **Blog de apoyo:** [Comunicaciones Http en Angular](https://academia-binaria.com/comunicaciones-http-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
