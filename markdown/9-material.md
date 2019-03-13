title: 9-Material
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Material Design y CLI de Angular

---

# 1. Repositorio multi-proyecto

# 2. Instalación y configuración de Material

# 3. Componentes básicos

---

class: impact

# 1. Repositorio multi-proyecto

## Carpetas src y projects

## Compilación multi - proyecto

---

## 1.1 Carpetas src y projects

CLI

```console
ng g application schemat --routing
```

--

angular.json

```
"es5BrowserSupport": true
```

---

## 1.2 Compilación multi - proyecto

package.json

```
"start:schemat": "ng serve schemat --aot -o --port 4271",
"build:prod:schemat": "ng build schemat --prod",
```

---

> Recap:

# 1. Repositorio multi-proyecto

## Carpetas src y projects

## Compilación multi - proyecto

---

class: impact

# 2. Instalación y configuración de Material

## Agregar dependencias con schematics

## Estilos, iconos y temas básicos

---

## 2.1 Agregar dependencias con schematics


```console
ng add @angular/material --project=schemat
```
---

## 2.2 estilos, iconos y temas básicos

index.html

app.module.ts

styles.css

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```


---

> Recap:

# 2. Instalación y configuración de Material

## Agregar dependencias con schematics

## Estilos, iconos y temas básicos

---

class: impact

# 3. Componentes básicos

## Navegación y layout
## Componentes básicos

---

## 3.1 Navegación y layout

``` console
ng g @angular/material:nav shell --project=schemat
```

app.component.html

```html
<app-shell></app-shell>
```
---

``` console
ng g @angular/material:dashboard home --project=schemat
```


app-routing

```typescript
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
```

shell.component.html
```html
<a mat-list-item [routerLink]="['/']">Home</a>
<!-- Add Content Here -->
<router-outlet></router-outlet>
```

---

## 3.2 Componentes básicos


### Formularios

``` console
ng g @angular/material:address-form contact --project=schemat
```

app-routing

```typescript
const routes: Routes = [
  {
    path: 'new-contact',
    component: ContactComponent
  }
];
```

shell.component.html
```html
<a mat-list-item [routerLink]="['/new-contact']">New Contact</a>
```


---

### Tablas

``` console
ng g @angular/material:table elements --project=schemat
```

app-routing

```typescript
const routes: Routes = [
  {
    path: 'elements-list',
    component: ElementsComponent
  }
];
```

shell.component.html
```html
<a mat-list-item [routerLink]="['/elements-list']">Elements List</a>
```

---

elements.component.html

```html
<mat-paginator #paginator
    [length]="dataSource.data.length"
    [pageIndex]="0"
    [pageSize]="5"
    [pageSizeOptions]="[5, 10, 15, 20]">
</mat-paginator>
```

---

### Árboles

``` console
ng g @angular/material:tree source --project=schemat
```

app-routing

```typescript
const routes: Routes = [
  {
    path: 'source-tree',
    component: SourceComponent
  }
];
```

shell.component.html
```html
<a mat-list-item [routerLink]="['/source-tree']">Source Tree</a>
```

---


> Recap:

# 3. Componentes básicos

## Navegación y layout

## Componentes básicos

---

> Next:

# Angular avanzado

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
