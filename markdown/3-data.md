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

# 1. Binding

# 2. Doble Binding

# 2. Estructuras

# 3. Modelo y controlador

---

class: impact

# 1. Binding

## Base

## Directivas

### Enlace del modelo hacia la vista

### Enlace de la vista hacia el modelo

---

## 1.0 Base

Creamos una nueva ruta funcionalidad para la gestión de contactos. Requiere ruta, enlace, módulo y componente.

```bash
ng g m contacts --routing true
ng g c contacts/contacts
```

--

En `app-routing` y en `contacts-routing`:

```typescript
  // app-routing
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  },
  // contacts-routing
  {
    path: '',
    component: ContactsComponent
  }
```

---

En `HeaderComponent`

```html
<a routerLink="contacts" routerLinkActive="router-link-active" class="button">
  <span> Contacts</span>
</a>
```

---

## 1.1 Directivas

> Para empezar agregamos algunas propiedades. En `contacts.component.ts`:

```typescript
public header = 'Contacts';
public description = 'Manage your contact list';
public numContacts = 0;
public counterClass = 'tag secondary';
public formHidden = false;
```

---

### 1.1.1 Enlace del modelo hacia la vista

En `contacts.component.html` mostramos cabeceras con estilo

```html
<h2>{{ header }}</h2>
<p>{{ description | uppercase }}</p>
<p>
  You have <mark [class]="counterClass">{{ numContacts }}</mark> contacts right
  now.
</p>
```

---

### 1.1.2 Enlace de la vista hacia el modelo

En `contacts.component.html` también actuamos sobre la vista

```html
<input
  value="Show Form"
  type="button"
  class="primary"
  (click)="formHidden=false"
/>
<input
  value="Hide Form"
  type="button"
  class="inverse"
  (click)="formHidden=true"
/>
<form [ngClass]="{'hidden':formHidden}">
  <fieldset><legend>Contact Form</legend></fieldset>
</form>
```

---

> Recap:

# 1. Binding

## Base

## Directivas

### Enlace del modelo hacia la vista

### Enlace de la vista hacia el modelo

---

> Next:

# Flujo de datos entre componentes Angular

## To be defined

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)
