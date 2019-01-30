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

# 1. Formularios

## Binding

## Doble Binding

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

--

En `HeaderComponent`

```html
<a routerLink="contacts" routerLinkActive="router-link-active" class="button">
  <span> Contacts</span>
</a>
```

---

## 1.1 Binding

En `contacts.component.html`

```html
<h2>{{ header }}</h2>
<p>{{ description | uppercase }}</p>
<p>
  You have <mark [class]="counterClass">{{ numContacts }}</mark> contacts right
  now.
</p>
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
  <fieldset>
    <legend>Contact Form</legend>
    <label for="name">Name</label>
    <input type="text" name="name" placeholder="Contact name" />
    <label for="email">Password</label>
    <input type="email" name="email" placeholder="e-mail address" />
  </fieldset>
</form>
```

---

En `contacts.component.ts`

```typescript
  public header = 'Contacts';
  public description = 'Manage your contact list';
  public numContacts = 0;
  public counterClass = 'tag secondary';
  public formHidden = false;
```

---

> Recap:

# 1. Formularios

## Binding

## Doble Binding

---

> Next:

# Flujo de datos entre componentes Angular

## To be defined

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)
