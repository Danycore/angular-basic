title: 2-SPA
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Páginas y rutas Angular SPA

---

# 1. Rutas

# 2. Lazy Loading

# 3. Rutas anidadas

# 4. Parámetros

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

### heroes.cmponent.html
```html
<h2>Initial Links to start: </h2>
<ul>
  <li>
    <h2><a target="_blank"
         rel="noopener"
         href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2><a target="_blank"
         rel="noopener"
         href="https://angular.io/cli">CLI Documentation</a></h2>
  </li>
  <li>
    <h2><a target="_blank"
         rel="noopener"
         href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>
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
  <a routerLink="/"
     class="logo">
    <span class="icon-home"></span>
    <span>{{ title }}</span>
  </a>
  <a routerLink="heroes"
     routerLinkActive="router-link-active"
     class="button">
    <span> 2- Heroes</span>
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
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    //loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    //loadChildren: './about/about.module#AboutModule'
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

Agregamos un enlace a esta nueva ruta en el `HeaderComponent`

```html
<a routerLink="about"
    routerLinkActive="router-link-active"
    class="button">
  <img width="32"
        style="vertical-align: -0.5em"
        src="./assets/logo.png" />
  <span> 2 - About us</span>
</a>
```

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

En `HeaderComponent`

```html
<header class="sticky">
  <a routerLink="/" class="logo">
    <span class="icon-home"></span> <span>{{ title }}</span>
  </a>
  <a routerLink="about" class="button">
    <span> About us</span>
  </a>
</header>
```

---

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
  <a routerLink="links" class="button"> Tutorial Links </a>
  <a routerLink="info" class="button"> More Info </a>
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
    this.authorId = activateRoute.snapshot.params.id;
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
<a routerLink="authors" class="button"> Credit Authors </a>
```

--

Y en `authors.component.html`

```html
<a routerLink="albertobasalo" class="button"> Alberto Basalo </a>
<a routerLink="johndoe" class="button"> John Doe </a>
```

---

> Recap:

# 4. Parámetros

## Variables en la ruta

## ActivatedRoute

---

> Next:

# [Formularios, tablas y modelos de datos en Angular](https://academiabinaria.github.io/angular-basic/readme/3-data.html)

## Formularios

## Estructuras y listados

## Modelo y controlador

> **Blog de apoyo:** [Páginas y rutas Angular SPA](https://academia-binaria.com/paginas-y-rutas-angular-spa/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
