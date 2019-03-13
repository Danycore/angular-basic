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
ng g application schemat
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
ng add @angular/material
```
---

## 2.2 estilos, iconos y temas básicos

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
ng generate @angular/material:nav shell
ng generate @angular/material:dashboard home
```

---

## 3.2 Componentes básicos

``` console
ng generate @angular/material:address-form student (contacts)
ng generate @angular/material:table students (elements) page 5
ng generate @angular/material:tree family (source)
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
