title: 6-http

class: animation-fade

layout: true

.bottom-bar[ {{title}} ]

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

## Refresco de datos

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
  loadChildren: './rates/rates.module#RatesModule'
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
*   this.httpClient.get(url).subscribe(v => (this.currentEuroRates = v));
  }
}
```

### Presentación en vista

```html
<pre>{{ currentEuroRates | json }}</pre>
```

---

## 1.3 Envío de datos

```typescript
export class RatesComponent implements OnInit {
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';

  public postRates() {
    const rates = this.transformData();
*   rates.forEach(r => this.httpClient.post(this.myRatesApi, r).subscribe());
  }

  private transformData() {
    const currentEntries = Object.entries(this.currentEuroRates.rates);
    return currentEntries.map(currentEntrie => ({
      date: this.currentEuroRates.date,
      currency: currentEntrie[0],
      euros: currentEntrie[1]
    }));
  }
}
```

### Presentación en vista

```html
<input value="Save Rates" type="button" (click)="postRates()" />
```

---

## 1.4 Refresco de datos

```typescript
export class RatesComponent implements OnInit {
 private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';
 public myRates: any[] = null;


 public getMyRates() {
    this.httpClient
*     .get<any[]>(this.myRatesApi)
      .subscribe(apiResult => (this.myRates = apiResult));
  }
}
```

### Presentación en vista

```html
<input value="Refresh" type="button" (click)="getMyRates()" />
<pre>{{ myRates | json }}</pre>
```

---

> Recap:

# 1. El servicio HttpClient

## Importación y declaración de servicios

## Obtención de datos

## Envío de datos

## Refresco de datos

---

class: impact

# 2. Observables

## Async

## pipe

## operators

---

## 2.1 Interface y servicio base

```console
ng g interface converter/culture-converter
ng g service converter/culture-converter
ng g component converter/culture-converter
```

```typeScript
export interface CultureConverter implements CultureConverter {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;
  convertTemperature: (source: number) => number;
}
```

```typescript
export class CultureConverterService implements CultureConverter {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;
  convertTemperature: (source: number) => number;
  constructor() {}
}
```

---

### Consumo

```typeScript
  public source: string;
  public target: string;
  public sourceUnits = 0;
  public targetUnits: number;
  constructor(private cultureConverterService:CultureConverterService){
  }

  public ngOnInit() {
    this.source = this.cultureConverterService.sourceCulture;
    this.target = this.cultureConverterService.targetCulture;
    this.convert();
  }
  public convert() {
    this.targetUnits =
      this.cultureConverterService.convertDistance(this.sourceUnits);
  }
```

---

```html
<h2>Culture Converter.</h2>
<h3>From {{ source }} to {{ target }}</h3>
<form>
  <fieldset>
    <section>
      <label for="sourceUnits">Distance</label>
      <input
        name="sourceUnits"
        type="number"
        [(ngModel)]="sourceUnits"
        placeholder="0"
      />
    </section>
  </fieldset>
  <input value="Convert" type="button" (click)="convert()" />
</form>
<section>
  <h4>Distance {{ targetUnits | number:'1.2-2' }}</h4>
</section>
```

---

## 2.2 Implementaciones

```typescript
@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor() {}

  public fromKilometersToMiles = kilometers => kilometers * 0.621;

  public fromMilesToKilometers = miles => miles * 1.609;

  public fromCelsiusToFarenheit = celsius => celsius * (9 / 5) + 32;

  public fromFarenheitToCelsius = farenheit => (farenheit - 32) * (5 / 9);
}
```

---

```typescript
@Injectable()
export class EuropeConverterService {
  sourceCulture = 'USA';
  targetCulture = 'Europe';
  constructor(private converterService: ConverterService) {}
  convertDistance = this.converterService.fromMilesToKilometers;
  convertTemperature = this.converterService.fromFarenheitToCelsius;
}
```

```typescript
@Injectable()
export class UsaConverterService implements CultureConverter {
  sourceCulture = 'Europe';
  targetCulture = 'USA';
  constructor(private converterService: ConverterService) {}
  convertDistance = this.converterService.fromKilometersToMiles;
  convertTemperature = this.converterService.fromCelsiusToFarenheit;
}
```

---

## 2.3 Provisión manual

```typescript
{
  providers: [
    {
      provide: CultureConverterService,
      useClass: UsaConverterService
    }
  ];
}
```

---

## 2.4 Factoría

```typescript
const cultureFactory = (converterService: ConverterService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeConverterService(converterService);
  } else {
    return new UsaConverterService(converterService);
  }
};
```

```typescript
export const environment = {
  appName: 'Angular - Board',
  production: false,
  unitsCulture: 'metric'
};
```

---

La provisión del servicio apunta a la función factoría. Si además el servicio dependiese de otro tenemos que especificarlo en el sub-array `deps:[]`.

```typescript
{
  providers: [
    {
      provide: CultureConverterService,
      useFactory: cultureFactory,
      deps: [ConverterService]
    }
  ];
}
```

---

> Recap:

# 2. Inversión del control

## Interface y servicio base

## Implementaciones

## Provisión manual

## Factoría

---

> Next:

# Comunicaciones http en Angular

## El cliente http

## Operaciones con observables

## Interceptores de llamadas

> **Blog de apoyo:** [Servicios inyectables en Angular](https://academia-binaria.com/servicios-inyectables-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
