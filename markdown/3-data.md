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

class: impact

# 2. Doble Binding

## NgModel

## Form

### Enlace del modelo hacia la vista

### Enlace de la vista hacia el modelo

---

## 2.1 NgModel

La directiva ngModel viene en el `FormsModule`

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

Usa la comunicación en ambos sentidos

- **(banana)** : de la vista al modelo
- **[box]** : del modelo a la vista

--

> La directiva se asocia con una propiedad del controlador...
> o mejor aún, con una propiedad del modelo del controlador

---

#### Directiva

```html
<input type="text" name="name" [(ngModel)]="contact.name" />
```

#### Modelo

```typescript
export class ContactsComponent implements OnInit {
  public contact = { name: '' };
  constructor() {}
  ngOnInit() {}
}
```

#### Espía

```html
<pre>{{ contact | json }}</pre>
```

---

## 2.2 Form

Hay más usos de las directivas en los formularios

Por ejemplo, dados el siguiente modelo:

```typescript
public contact = { name: '', isVIP: false, gender: '' };
```

---

### 2.2.1 CheckBox

```html
<br />
<label for="isVIP">Is V.I.P.</label>
<input type="checkbox" name="isVIP" [(ngModel)]="contact.isVIP" />
```

### 2.2.2 RadioButton

```html
<br />
<label for="gender">Gender</label>
<input type="radio" value="male" name="gender" [(ngModel)]="contact.gender" />
<span>Male</span>
<input type="radio" value="female" name="gender" [(ngModel)]="contact.gender" />
<span>Female</span>
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

Dado el siguiente modelo

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
<br />
<label for="workStatus">Work Status</label>
<select name="workStatus" [(ngModel)]="contact.workStatus">
  <option *ngFor="let status of workStatuses" [value]="status.id">
    <span>{{ status.description }}</span>
  </option>
</select>
```

> let **iterador** of **iterable**

---

## 3.2 \*ngIf

Directiva estructurales **condicional**

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
  <input type="text" name="company" [(ngModel)]="contact.company" />
</section>
<ng-template #education>
  <br />
  <label for="education">Education</label>
  <input type="text" name="education" [(ngModel)]="contact.education" />
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

> Next:

# Flujo de datos entre componentes Angular

## To be defined

> **Blog de apoyo:** [Formularios, tablas y modelos de datos en Angular](https://academia-binaria.com/formularios-tablas-y-modelos-de-datos-en-angular/)
