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

---

## 1.2 Situaciones

---

> Recap:

# 1. Comunicación entre componentes

## Necesidad

## Situaciones

---

class: impact

# 2. Contenedor / Presentadores

## @Input()

## @Output()

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

## 2.1 @Input()

---

## 2.2 @Output()

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

---

## 3.2 Entre estructuras desacopladas

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
