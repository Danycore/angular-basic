title: 2-SPA
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Base para una aplicación Angular

---

# 1. Rutas

# 2. Lazy Loading

# 3. Parámetros

# 4. Rutas anidadas

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

El componente `NotFoundComponent` se asocia con la ruta `'not-found'`

```bash
ng g c core/not-found
```

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

> Recap:

# 1. Rutas

## RouterModule

## Router Outlet

## Router Link

---

class: impact

# 2 Lazy Loading

## Webpack y los bundles por ruta

## El enrutador delegado

## Navegación

---

## 2.1 Webpack y los bundles por ruta

- Objetivo: diferir la descarga de las rutas no visitadas

--

- Empaquetar cada ruta en un _bundle_

--

- Requiere un módulo por ruta

--

- Y un convenio especial con _webpack_

---

### Crear los componentes en módulos con enrutado

```bash
ng g m home --routing true
ng g c home/home
ng g m about --routing true
ng g c about/about
```

--

Y se configuran las `rutas` con **'rutas al módulo'**

```typescript
const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  }
];
```

---

## 2.2 El enrutador delegado

- `loadChildren` delega el enrutado en otro módulo; `HomeRoutingModule`

```typescript
const routes: Routes = [
  {
*   path: '',
    component: HomeComponent
  }
];
```

--

> Ojo al path. En `AboutRoutingModule` sería:

```typescript
const routes: Routes = [
  {
*   path: '',
    component: AboutComponent
  }
];
```

---

> Comprobar en ejecución

### Los bundles se descargan al navegar por las rutas

---

> Recap:

# 2 Lazy Loading

## Webpack y los bundles por ruta

## El enrutador delegado

## Navegación

---

class: impact

# 3. Rutas anidadas

## Children

## RouterOutlet anidado

---

## 3.1 Children

```bash
ng g c about/about/links
ng g c about/about/info
```

En `about-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: 'links',
        component: LinksComponent
      },
      {
        path: 'info',
        component: InfoComponent
      }
    ]
  }
];
```

---

## 3.2 RouterOutlet anidado

En `AboutComponent` :

```html
<header class="sticky">
  <a routerLink="links" class="button"> <span> Tutorial Links</span> </a>
  <a routerLink="info" class="button"> <span> More Info</span> </a>
</header>
<router-outlet></router-outlet>
```

---

> Recap:

# 3. Rutas anidadas

## Children

## RouterOutlet anidado

---

class: impact

# 4. Parámetros

## Variables en la ruta

## ActivatedRoute

---

## 4.1 Variables en la ruta

Dada esta estructura nuevos components

```bash
ng g c about/about/authors
ng g c about/about/authors/author
```

---

Podemos gestionar dichas rutas en `about-routing.module.ts`

```typescript
{
  path: '',  component: AboutComponent,
  children: [
    {
      path: 'links', component: LinksComponent
    },
    {
      path: 'info', component: InfoComponent
    },
    {
      path: 'authors', component: AuthorsComponent
    },
    {
*     path: 'authors/:id', component: AuthorComponent
    }
  ]
}
```

--

Resuelve rutas como: _/authors/albertobasalo_ o _/authors/johndoe_

---

## 4.2 ActivatedRoute

Contenido del fichero `author.component.ts` relacionado con la obtención del parámetro de la ruta activa:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class AuthorComponent implements OnInit {
  public authorId = '';
  constructor(activateRoute: ActivatedRoute) {
    this.authorId = activateRoute.snapshot.params['id'];
  }
  ngOnInit() {}
}
```

Usamos la instancia `activateRoute` de la clase `ActivatedRoute`

Para acceder a datos de la URL activa y mostrar los datos en la vista

```html
<h2>Author profile</h2>
<h3>{{ authorId }}</h3>
```

---

Enlazamos todo agregando una entrada en `AboutComponent` :

```html
<a routerLink="authors" class="button"> <span> Credit Authors</span> </a>
```

--

Y en `authors.component.html`

```html
<a routerLink="albertobasalo" class="button"> <span> Alberto Basalo</span> </a>
<a routerLink="jhondoe" class="button"> <span> Jhon Doe</span> </a>
```

---

> Recap:

# 4. Parámetros

## Variables en la ruta

## ActivatedRoute

---

> Next:

# Formularios, tablas y modelos de datos en Angular

## To be defined

```

```
