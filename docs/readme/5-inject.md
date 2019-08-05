title: 5-Inject
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Servicios inyectables en Angular

---

# 1. Inyección de dependencias

# 2. Inversión del control

---

class: impact

# 1. Inyección de dependencias

## Generación de servicios

## Consumo de dependencias

---

Módulo y componente

```console
ng g m converter --routing true
ng g c converter/converter
```

`app-routing.module.ts`

```typescript
{
  path: 'converter',
  loadChildren: () => import('./5-inject/converter/converter.module').then(m => m.ConverterModule)
},
```

---

`converter-routing.module.ts`

```typescript
{
  path: '',
  component: ConverterComponent
}
```

`header.component.html`

```html
<a routerLink="converter"
    routerLinkActive="router-link-active"
    class="button">
  <span> 5 - Converter</span>
</a>
```

---

## 1.1 Generación de servicios

```console
ng g s converter/calculator
```

Implementación

```typescript
import { Injectable } from '@angular/core';

@Injectable({
*  providedIn: 'root'
})
export class CalculatorService {
  constructor() {}

  public fromKilometersToMiles = kilometers => kilometers * 0.621;
}
```

---

## 1.2 Consumo de dependencias

```typescript
export class ConverterComponent implements OnInit {
  public kilometers = 0;
  public miles: number;

* constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.convert();
  }

  public convert() {
    this.miles = this.calculatorService.fromKilometersToMiles(this.kilometers);
  }
}
```

---

### Presentación en vista

```html
<h2>Distance Converter.</h2>
<h3>From Europe to USA</h3>
<form>
  <fieldset>
    <section>
      <label for="kilometers">Kilometers</label>
      <input
        name="kilometers"
        type="number"
        [(ngModel)]="kilometers"
        placeholder="0"
      />
    </section>
  </fieldset>
  <input value="Convert" type="button" (click)="convert()" />
</form>
<section>
  <h4>{{ miles | number:'1.2-2' }} miles</h4>
</section>
<a [routerLink]="['culture']">Go to Abstract Culture Converter</a>
```

---

> Recap:

# 1. Inyección de dependencias

## Generación de servicios

## Consumo de dependencias

---

class: impact

# 2. Inversión del control

## Interface y servicio base

## Implementaciones

## Provisión manual

## Factoría

---

## 2.1 Interface y servicio base

```console
ng g interface converter/i-culture-converter
ng g s converter/abstract-culture-converter
ng g c converter/culture-converter
```

```typescript
// converter-routing
{
  path: 'culture',
  component: CultureConverterComponent
}
```

```typeScript
export interface ICultureConverter {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;
  convertTemperature: (source: number) => number;
}
```

```typescript
export class AbstractCultureConverterService implements ICultureConverter {
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
export class CultureConverterComponent implements OnInit {
  public source: string;
  public target: string;
  public sourceTemperature = 0;
  public targetTemperature: number;
  public sourceDistance = 0;
  public targetDistance: number;
  constructor(private cultureConverterService: AbstractCultureConverterService) {}

  public ngOnInit() {
    this.source = this.cultureConverterService.sourceCulture;
    this.target = this.cultureConverterService.targetCulture;
    this.convert();
  }

  public convert() {
    this.convertDistance();
    this.convertTemperature();
  }

  private convertTemperature() {
    this.targetTemperature = this.cultureConverterService.convertTemperature(
      this.sourceTemperature
    );
  }
  private convertDistance() {
    this.targetDistance = this.cultureConverterService.convertDistance(this.sourceDistance);
  }
}
```

---

```html
<h2> Culture Converter. </h2>
<h3> From {{ source }} to {{ target }} </h3>
<form>
  <fieldset>
    <section>
      <label for="sourceTemperature">Temperature</label>
      <input name="sourceTemperature"
             type="number"
             [(ngModel)]="sourceTemperature"
             placeholder="0" />
    </section>
    <section>
      <label for="sourceDistance">Distance</label>
      <input name="sourceDistance"
             type="number"
             [(ngModel)]="sourceDistance"
             placeholder="0" />
    </section>
  </fieldset>
  <input value="Convert"
         type="button"
         (click)="convert()">
</form>
<section>
  <h4>Temperature {{ targetTemperature | number:'1.2-2' }} </h4>
  <h4>Distance {{ targetDistance | number:'1.2-2' }} </h4>
</section>
```

---

## 2.2 Implementaciones

```typescript
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private milesPerKilometer = 0.62137;
  private kilometersPerMile = 1.609;
  private boilingFahrenheit = 32;
  private factorC2F = 1.8;
  private factorF2C = 0.5555;

  constructor() {}

  public fromKilometersToMiles = (kilometers: number): number => kilometers * this.milesPerKilometer;

  public fromMilesToKilometers = (miles: number): number => miles * this.kilometersPerMile;

  public fromCelsiusToFahrenheit = (celsius: number): number => celsius * this.factorC2F + this.boilingFahrenheit;

  public fromFahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - this.boilingFahrenheit) * this.factorF2C;
}
```

---

```console
ng g s converter/european-culture-converter
ng g s converter/american-culture-converter

```

---

```typescript
@Injectable()
export class EuropeanCultureConverterService implements ICultureConverter {
  sourceCulture = 'USA';
  targetCulture = 'Europe';
  constructor(private calculatorService: CalculatorService) {}
  public convertDistance = this.calculatorService.fromMilesToKilometers;
  public convertTemperature = this.calculatorService.fromFahrenheitToCelsius;
}
```

```typescript
@Injectable()
export class AmericanCultureConverterService implements ICultureConverter {
  sourceCulture = 'Europe';
  targetCulture = 'USA';
  constructor(private calculatorService: CalculatorService) {}
  public convertDistance = this.calculatorService.fromKilometersToMiles;
  public convertTemperature = this.calculatorService.fromCelsiusToFahrenheit;
}
```

---

## 2.3 Provisión manual

```typescript
{
  providers: [
    {
      provide: AbstractCultureConverterService,
      useClass: AmericanCultureConverterService
    }
  ];
}
```

---

## 2.4 Factoría

```typescript
const cultureConverterFactory = (calculatorService: CalculatorService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeanCultureConverterService(calculatorService);
  } else {
    return new AmericanCultureConverterService(calculatorService);
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
      provide: AbstractCultureConverterService,
      useFactory: cultureConverterFactory,
      deps: [CalculatorService]
    }
  ]
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

# [Comunicaciones http en Angular](https://academiabinaria.github.io/angular-basic/readme/6-http.html)

## El cliente http

## Operaciones con observables

## Interceptores de llamadas

> **Blog de apoyo:** [Servicios inyectables en Angular](https://academia-binaria.com/servicios-inyectables-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
