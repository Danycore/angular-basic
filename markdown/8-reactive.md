title: 8-reactive
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Formularios reactivos con Angular

---

# 1. Desacople entre vista y modelo

# 2. Validación y estados

# 3. Un gestor de credenciales

---

class: impact

# 1. Desacople entre vista y modelo

## Form builder

## Form control

## Form view

---

El módulo de seguridad

```console
ng g m security --routing true
ng g c security/register
```

`app-routing.module.ts`

```typescript
{
  path: 'security',
  loadChildren: './security/security.module#SecurityModule'
},
```

---

`security-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'register'
  }
];
```

`header.component.html`

```html
<a routerLink="security/register" class="button">Register</a>
```

---

## 1.1 Form builder

```typescript

```

---

## 1.2 Form control

```typescript

```

---

## 1.3 Form view


```html

```

---

> Recap:

# 1. Desacople entre vista y modelo

## Form builder

## Form control

## Form view

---

class: impact

# 2. Validación y estados

## Validadores predefinidos y personalizados

## Estados de cambio y validación

---

## 2.1 Validadores predefinidos y personalizados

---

## 2.2 Estados de cambio y validación

---

> Recap:

# 2. Validación y estados

## Validadores predefinidos y personalizados

## Estados de cambio y validación

---

class: impact

# 3. Un gestor de credenciales

## Detección y redirección de intrusos

## Almacenamiento y uso del token

---

## 3.1 Detección y redirección de intrusos

---

## 3.2 Almacenamiento y uso del token

---

> Recap:

# 3.  Un gestor de credenciales

## Detección y redirección de intrusos

## Almacenamiento y uso del token

---

> Next:

# Material design y Angular

## Instalación y comandos

## Layout básico

## Componentes básicos

> **Blog de apoyo:** [Formularios reactivos con Angular](https://academia-binaria.com/formularios-reactivos-con-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
