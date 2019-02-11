title: 4-Flow
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Flujo de datos entre componentes Angular

---

# 1. Comunicación entre componentes

# 2. Contenedor / Presentadores

# 3. Entre páginas o estructuras

---

class: impact

# 1. Comunicación entre componentes

## Necesidad

## Situaciones

---

## 1.1 Necesidad

- Principio de desarrollo _Divide y Vencerás_
- Aplicaciones SPA
-

---

## 1.2 Situaciones

- Comunicar componentes acoplados
- Comunicar componentes en páginas distintas
- Comunicar entre estructuras dinámicas

---

> Recap:

# 1. Comunicación entre componentes

## Necesidad

## Situaciones

---

class: impact

# 2. Contenedor / Presentadores

## El patrón

## @Input()

## @Output()

---

## 2.1 El patrón

Es una elección de arquitectura que promueve:

- Reparto de responsabilidades:

  - Contenedor: gestión de datos
  - Presentadores: interacción con usuario

- Reutilización de presentadores

---

### Contenedor y presentadores

```console
ng g m 4-flow/car
ng g c 4-flow/car/car
ng g c 4-flow/car/car/display
ng g c 4-flow/car/car/pedals
```

```typescript
{
  path: 'car',
  loadChildren: './car/car.module#CarModule'
}
```

```html
<a routerLink="car" class="button">
  <span> 4 - Car</span>
</a>
```

---

### Container

<!-- prettier-ignore-start -->

```html
<h2>
  {{ car.name }}
</h2>
<h3>Top speed: {{ car.maxSpeed }}</h3>
<app-display [currentSpeed]="car.currentSpeed"
  [topSpeed]="car.maxSpeed"
  [units]="'Km/h'" >
</app-display>
<app-pedals (brake)="onBrake($event)"
  [disableBrake]="disableBrake"
  (throttle)="onThrottle($event)"
  [disableThrottle]="disableThrottle">
</app-pedals>
```

## <!-- prettier-ignore-end -->

---

```typescript
public car: CarModel;
public disableBrake: boolean;
public disableThrottle: boolean;

constructor() {}

public ngOnInit() {
  this.car = { name: 'Roadster', maxSpeed: 120, currentSpeed: 0 };
  this.checkLimits();
}
private checkLimits() {
  this.disableBrake = false;
  this.disableThrottle = false;
  if (this.car.currentSpeed <= 0) {
    this.car.currentSpeed = 0;
    this.disableBrake = true;
  } else if (this.car.currentSpeed >= this.car.maxSpeed) {
    this.car.currentSpeed = this.car.maxSpeed;
    this.disableThrottle = true;
  }
}
```

---

```typescript
public onBrake(drive: number) {
  this.car.currentSpeed -= this.getDelta(drive);
  this.checkLimits();
}

public onThrottle(drive: number) {
  this.car.currentSpeed += this.getDelta(drive);
  this.checkLimits();
}

private getDelta = (drive: number) =>
  drive + (this.car.maxSpeed - this.car.currentSpeed) / 10;
```

---

## 2.2 @Input()

Envío de información **desde el contendor hacia el presentador**

Usa `[propiedad]="expresion"` en el contendor

Y `@Input() propiedad` en el presentador

---

```typescript
export class DisplayComponent implements OnInit {
  @Input() public currentSpeed: number;
  @Input() public topSpeed: number;
  @Input() public units: string;
  constructor() {}
  ngOnInit() {}
  public getSpeedClass = () =>
    this.currentSpeed < this.getThreshold() ? 'primary' : 'secondary';
  private getThreshold = () => this.topSpeed * 0.8;
}
```

```html
<h3>Speed:</h3>
<div class="card">
  <div class="section">
    {{ currentSpeed | number:'1.2-2' }} {{ units }}
  </div>
  <progress [value]="currentSpeed"
    [ngClass]="getSpeedClass()"
    [max]="topSpeed">
  </progress>
</div>
```

---

## 2.3 @Output()

Envío de información **desde el presentador hacia el contendor**

Usa `(evento)="instruccion"` en el contendor

Y `@Output() evento = new EventEmitter<any>()` en el presentador

---

```typescript
export class PedalsComponent implements OnInit {
  @Input() public disableBrake: boolean;
  @Input() public disableThrottle: boolean;
  @Output() public brake = new EventEmitter<number>();
  @Output() public throttle = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
```

---

```html
<h3>
  Pedals:
</h3>
<form>
  <input value="brake"
    class="secondary"
    type="button"
    [disabled]="disableBrake"
    (click)="brake.emit(1)"/>
  <input value="throttle"
    class="tertiary"
    type="button"
    [disabled]="disableThrottle"
    (click)="throttle.emit(1)"/>
</form>
```

---

> Recap:

# 2. Contenedor / Presentadores

## @Input()

## @Output()

---

class: impact

# 3. Entre páginas o estructuras

## Entre páginas

## Entre estructuras desacopladas

---

## 3.1 Entre páginas

- A través del `RouterModule`
---

## 3.2 Entre estructuras desacopladas

- Usando `Observables`

---

> Recap:

# 3. Entre páginas o estructuras

## Entre páginas

## Entre estructuras desacopladas

---

> Next:

# Flujo de datos entre componentes Angular

## Contenedores y presentadores

## @Input y @Output

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
