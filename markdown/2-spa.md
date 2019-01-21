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

# 3. Parámetros

## Variables en la ruta

## ActivatedRoute

---

## 3.1 Variables en la ruta

Dada esta estructura de módulo y components

```bash
ng g m projects --routing true
ng g c projects/projects
ng g c projects/projects/new-project
ng g c projects/projects/project
```

--

Y delegamos su gestión desde `AppRoutingModule`

```typescript
const routes: Routes = [
  {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule'
  }
];
```

---

Podemos gestionar dichas rutas en `projects\projects-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'new',
    component: NewProjectComponent
  },
  {
*   path: ':id',
    component: ProjectComponent
  }
];
```

--

Resuelve rutas como: _/projects/write-a-book_ o _/projects/develop-a-personal-web_

---

## 3.2 ActivatedRoute

Contenido del fichero `project.component.ts` relacionado con la obtención del parámetro de la ruta activa:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class ProjectComponent implements OnInit {
  public projectId = '';
  constructor(activateRoute: ActivatedRoute) {
    this.projectId = activateRoute.snapshot.params['id'];
  }
  ngOnInit() {}
}
```

Usamos la instancia `activateRoute` de la clase `ActivatedRoute`

Para acceder a datos de la URL activa

---

> Recap:

# 3. Parámetros

## Variables en la ruta

## ActivatedRoute

---

class: impact

# 4. Rutas anidadas

## Children

## RouterOutlet anidado

---

## 4.1 Children

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

## 4.2 RouterOutlet anidado

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

# 4. Rutas anidadas

## Children

## RouterOutlet anidado

---

> Next:

# Formularios, tablas y modelos de datos en Angular

## To be defined

```

```
