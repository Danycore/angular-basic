title: 0-Hello
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Hola Angular CLI

---

# 1. Instalación de Angular CLI 7

Necesitarás _NodeJS_ y su manejador de de paquetes _npm_.

Instrucciones para instalar angular cli.

```console
*$ npm i -g @angular/cli@latest
$ ng version
$ ng help
$ ng new --help
```

---

# 2. Crear y ejecutar aplicaciones Angular 7

## Configuración que viene por defecto,

## Soluciones a medida.

> Para más información mira la documentación del comando [ng new](https://angular.io/cli/new).

---

## 2.1 Normal

```console
ng new normal
```

--

## 2.2 Minimalista

```console
ng new minimalista -s -S -t
```

--

## 2.3 Profesional

```console
ng new profesional --experimental-ivy true -p acme --routing true
```

---

## 2.4 Empresarial

```console
ng new empresarial --create-application false
cd empresarial
ng generate application compras -p acme --routing true
```

--

## 2.5 Angular Board

> La aplicación que sirve de ejemplo a este tutorial fue creada con este comando:

```console
ng new angular-board --routing true -s -S
```

---

class: impact

# 3. Estructura de una aplicación Angular

## Ficheros y carpetas principales

---

## 3.1 Ficheros y carpetas principales

-   **angular.json** _: configuración del propio CLI. La madre de todos los configuradores_
-   **package.json** _: dependencias de librerías y scripts_
-   **src/** _: la carpeta donde están los archivos fuentes_
    -   **index.html** _: un fichero HTML índice estándar_
    -   **main.ts** _: fichero TypeScript de arranque de la aplicación_
    -   **app/** _: la carpeta con el código específico de tu aplicación_
        -   **app.module.ts** _: las aplicaciones son árboles de módulos, y este es su raíz_
        -   **app.component.ts** _: las páginas son árboles de componentes, y este es su raíz_
        -   **app.component.html** _: los componentes tienen una parte visual, y esta es su plantilla_

---

# 4. Edición

## 4.1 Hola Mundo

**cambiar un fichero de código y comprobar el resultado** en el navegador.

1. Abre el fichero `app.component.ts`
2. Busca dentro de él una clase llamada `AppComponent`.
3. Asígnale el saludo de rigor: `title = 'actibot: hello world ;-)';`.
4. Guarda y comprueba cómo tu navegador **se habrá actualizado automáticamente**.

---

## 4.2 `npm start`

1. `npm start`
2. `ng serve`
3. **webpack** server en http://localhost:4270
    1. vigilancia de cambios sobre la carpeta `src/`
    2. _live reload_
    3. compilado de la aplicación
    4. recarga del navegador

---

# 5. Configuración

## 5.1 Angular.json

-   Configuración Multi proyecto propia de angular.
-   Rutas y configuraciones básicas para entornos de compilación y despliegue

## 5.2 Package.json

-   Dependencias en ejecución y para desarrollo
-   Scripts de ayuda

## 5.3 Environment

-   Usadas en tiempo de ejecución
-   Valores distintos por entorno

---

### Ejemplo Angular.json

Instalación de un producto de terceros

```console
npm install mini.css --save
```

Configuración en `angular.json`

```json
{
    "styles": [
        "src/styles.css",
*       "./node_modules/mini.css/dist/mini-default.min.css"
    ]
}
```

---

### Ejemplo Package.json

```json
{
    "scripts": {
    "build:doc": "cd ./documentation/ && bs e -o ../docs/readme",
    "build:prod": "ng build --prod",
    "build:pub": "ng build --prod --output-path docs --base-href https://academiabinaria.github.io/ActiBot/",
    "e2e": "ng e2e",
    "http-server": "http-server ./dist/actibot/ -c-1 -p4271 -a localhost -o",
    "lint": "ng lint",
    "ng": "ng",
    "pub:doc": "npm run build:doc && npm run push",
    "pub": "npm run build:pub && npm run build:doc && npm run push",
    "push": "git add * && git commit -m 'pub' && git push",
    "start:doc": "cd ./documentation/ && bs s",
    "start:prod": "npm run build:prod && npm run http-server",
*   "start": "ng serve --aot -o --port 4270",
    "test": "ng test"
  }
}
```

---

### Ejemplo Environments

```typescript
export const environment = {
    appName: 'Actibot',
    production: false
};
```

```typescript
title = environment.appName + 'hello world ;-)';
```

--

### Ejemplo Assets

```html
<img width="100" src="./assets/logo.png" />
```

---

# 6. Angular 7, el CLI 7 y su ecosistema

-   [Angular Console](https://angularconsole.com/)
-   [Prettier](https://prettier.io/)
-   [Angular Material](https://material.angular.io/)

---

## 6.1 Prettier.config.js

```js
module.exports = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    rangeStart: 0,
    rangeEnd: Infinity,
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve'
};
```
