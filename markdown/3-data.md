title: 3-Data
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Formularios, tablas y modelos de datos en Angular

---

# 1. Formularios

# 2. Estructuras y listados

# 3. Modelo y controlador

---

class: impact

# 1. Rutas

## RouterModule

## Router Outlet

## Router Link

---

## 1.1 RouterModule

`AppRoutingModule` importa, configura y exportar al `RouterModule`

```typescript
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
@NgModule({
* imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

### Componentes y rutas

```bash
ng g c heroes
ng g c core/not-found
```

El componente `HeroesComponent` se asocia con la ruta `'heroes'`
El componente `NotFoundComponent` se asocia con la ruta `'not-found'`

--

### RedirectTo

Nadie va voluntariamente a esa ruta

--

Sólo los que se pierden

--

```typescript
{
  path: '**',
  redirectTo: 'not-found'
}
```

---

## 1.2 Router Outlet

El contenido de `main.component.ts`, ahora será dinámico

```html
<main class="container">
  <router-outlet></router-outlet>
  <!-- Dynamic content here! -->
</main>
```

Por ejemplo el contenido de `NotFoundComponent` será

```html
<h1>Not Found</h1>
<h2>404</h2>
<a routerLink="/">Go home</a>
```

---

## 1.2 Router Link

```html
<a routerLink="/">Go home</a>
```

Es una _Directiva_

--

Como un atributo, pero con superpoderes

--

Por ahora, _simplemente_ mantiene la gestión de las rutas en el lado del navegador.

---

### Menu header

El componente `app-header` queda así:

```html
<header class="sticky">
  <a routerLink="/" class="logo">
    <span class="icon-home"></span> <span>{{ title }}</span>
  </a>
  <a routerLink="heroes" routerLinkActive="router-link-active" class="button">
    <span> Heroes</span>
  </a>
</header>
```

---

> Recap:

# 1. Rutas

## RouterModule

## Router Outlet

## Router Link

---

> Next:

# Flujo de datos entre componentes Angular

## To be defined

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)
