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

# 3. Estructuras

# 4. Modelo y controlador

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
    loadChildren: () => import('./3-data/contacts/contacts.module').then(m => m.ContactsModule)
    // loadChildren: './contacts/contacts.module#ContactsModule'
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
<a routerLink="contacts"
    routerLinkActive="router-link-active"
    class="button">
  <span> 3 - Contacts</span>
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
  You have <mark [class]="counterClass">{{ numContacts }}</mark> contacts now.
</p>
```

---

### 1.1.2 Enlace de la vista hacia el modelo

En `contacts.component.html` también actuamos sobre la vista

```html
<input
  value="Show Form"
  class="primary"
  type="button"
  (click)="formHidden=false"
/>
<input
  value="Hide Form"
  class="inverse"
  type="button"
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

class: impact

# 2. Doble Binding

## NgModel

## Form

### Enlace del modelo hacia la vista

### Enlace de la vista hacia el modelo

---

## 2.1 NgModel

La directiva _ngModel_ viene en el `FormsModule`

Hay que importarlo antes de usarlo. Por ejemplo en `contacts.module.ts`

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
*   FormsModule
  ]
})
export class ContactsModule { }
```

---

### Banana in a box [()]

Hace referencia al _paréntesis dentro del corchete_

```html
[(ngModel)]="model.property"
```

Usa la comunicación en ambos sentidos

- **(banana)** : de la vista al modelo
- **[box]** : del modelo a la vista

--

> La directiva se asocia con una propiedad del controlador...
> o mejor aún, con una **propiedad del modelo** del controlador

---

#### Modelo

```typescript
public contact = { name: '' };
```

#### Directiva

```html
<section>
  <label for="name">Name</label>
  <input
    name="name"
    type="text"
    [(ngModel)]="contact.name"
    placeholder="Contact name"
  />
</section>
```

#### Espía

```html
<pre>{{ contact | json }}</pre>
```

---

## 2.2 Form

Hay más usos de las directivas en los formularios

Por ejemplo, dado el siguiente modelo:

```typescript
public contact = { name: '', isVIP: false, gender: '' };
```

---

### 2.2.1 CheckBox

```html
<section>
  <label for="isVIP">Is V.I.P.</label>
  <input name="isVIP" type="checkbox" [(ngModel)]="contact.isVIP" />
</section>
```

### 2.2.2 Radio Buttons

```html
<section>
  <label for="gender">Gender</label>
  <input name="gender" value="m" type="radio" [(ngModel)]="contact.gender" />
  <i>Male</i>
  <input name="gender" value="f" type="radio" [(ngModel)]="contact.gender" />
  <i>Female</i>
</section>
```

---

> Recap:

# 2. Doble Binding

## NgModel

## Form

### Enlace del modelo hacia la vista

### Enlace de la vista hacia el modelo

---

class: impact

# 3. Estructuras

## \*ngFor

## \*ngIf

---

## 3.1 \*ngFor

Directiva estructural **repetitiva**

Dado el siguiente modelo:

```typescript
public workStatuses = [
  { id: 0, description: 'unknow' },
  { id: 1, description: 'student' },
  { id: 2, description: 'unemployed' },
  { id: 3, description: 'employed' }
];
public contact = { name: '', isVIP: false, gender: '', workStatus: 0 };
```

---

> \*ngFor

```html
<section>
  <label for="workStatus">Work Status</label>
  <select name="workStatus" [(ngModel)]="contact.workStatus">
    <option *ngFor="let status of workStatuses" [value]="status.id">
      <span>{{ status.description }}</span>
    </option>
  </select>
</section>
```

> let **iterador** of **iterable**

> > uso avanzado de _trackBy_

---

## 3.2 \*ngIf

Directiva estructural **condicional**

Dado el siguiente modelo

```typescript
public contact = {
  name: '',
  isVIP: false,
  gender: '',
  workStatus: '0',
  company: '',
  education: ''
};
```

---

> \*ngIf

```html
<section *ngIf="contact.workStatus=='3'; else education">
  <label for="company">Company Name</label>
  <input name="company" type="text" [(ngModel)]="contact.company" />
</section>
<ng-template #education>
  <section>
    <label for="education">Education</label>
    <input name="education"
            type="text"
            [(ngModel)]="contact.education"
            placeholder="Education" />
  </section>
</ng-template>
```

> if **condition** else **template**

> > también hay _\*ngSwitch_

---

> Recap:

# 3. Estructuras

## \*ngFor

## \*ngIf

---

class: impact

# 4. Modelo y controlador

## Interfaces y modelos

## ViewModel en el controlador

---

## 4.1 Interfaces y modelos

> Mejor interface que clase

```typescript
export interface Option {
  id: number;
  description: string;
}

export interface Contact {
  name: string;
  isVIP: boolean;
  gender: string;
  workStatus: number | string;
  company: string;
  education: string;
}
```

> tipos compuestos `number | string`

---

Se usan para tipificar las propiedades

```typescript
public workStatuses: Option[] = [
    { id: 0, description: 'unknow' },
    { id: 1, description: 'student' },
    { id: 2, description: 'unemployed' },
    { id: 3, description: 'employed' }
  ];
public contact: Contact = {
    name: '',
    isVIP: false,
    gender: '',
    workStatus: 0,
    company: '',
    education: ''
  };
public contacts: Contact[] = [];
```

---

## 4.2 ViewModel en el controlador

No solo propiedades, también métodos

```typescript
public saveContact() {
  this.contacts.push({ ...this.contact });
  this.updateCounter();
}

private updateCounter() {
  this.numContacts = this.contacts.length;
  this.counterClass = this.numContacts === 0 ? 'tag secondary' : 'tag primary';
}
```

```html
<input value="Save" type="submit" (click)="saveContact()" />
```

---

### OnInit

```typescript
public workStatuses: Option[];
public contact: Contact;
public contacts: Contact[];
constructor() {}
public ngOnInit() {
  this.workStatuses = [
    { id: 0, description: 'unknow' },
    { id: 1, description: 'student' },
    { id: 2, description: 'unemployed' },
    { id: 3, description: 'employed' }
  ];
  this.contact = {
    name: '',
    isVIP: false,
    gender: '',
    workStatus: 0,
    company: '',
    education: ''
  };
  this.contacts = [];
}
```

---

### Repasamos

```html
<ul *ngIf="contacts.length>0; else empty">
  <li *ngFor="let contact of contacts">
    <span>{{ contact.name }}</span>
    <input value="Delete" type="button" (click)="deleteContact(contact)" />
  </li>
</ul>
<ng-template #empty> <i>No data yet</i> </ng-template>
```

```typescript
public deleteContact(contact: Contact) {
  this.contacts = this.contacts.filter(c => c.name !== contact.name);
  this.updateCounter();
}
```

---

> Recap

# 4. Modelo y controlador

## Interfaces y modelos

## ViewModel en el controlador

---

> Next:

# [Flujo de datos entre componentes Angular](https://academiabinaria.github.io/angular-basic/readme/4-flow.html)


## Comunicación entre componentes

## El patrón Contenedor / Presentadores

## Comunicaciones entre páginas o estructuras

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
