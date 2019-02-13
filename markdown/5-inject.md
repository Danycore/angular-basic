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
  loadChildren: './converter/converter.module#ConverterModule'
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
<a routerLink="converter" class="button">
  <span> Converter</span>
</a>
```

---

## 1.1 Generación de servicios



---

## 1.2 Consumo de dependencias


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

---

## 2.2 Implementaciones

---

## 2.3  Provisión manual


---

## 2.4  Factoría
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
