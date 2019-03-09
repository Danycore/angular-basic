title: 8-reactive
class: animation-fade
layout: true

.bottom-bar[
{{title}}
]

---

class: impact

# {{title}}

## Formularios reactivos con Angular

---

# 1. Desacople entre vista y modelo

# 2. Validación y estados

# 3. Un gestor de credenciales

---

class: impact

# 1. Desacople entre vista y modelo

## Form builder

## Form control

## Form view

---

El módulo de seguridad

```console
ng g m security --routing true
ng g c security/register
```

`app-routing.module.ts`

```typescript
{
  path: 'security',
  loadChildren: './security/security.module#SecurityModule'
},
```

---

`security-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'register'
  }
];
```

`header.component.html`

```html
<a routerLink="security/register" class="button">Register</a>
```

---

## 1.1 Form builder

ReactiveFormModule

```typescript
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
*   ReactiveFormsModule
  ]
})
export class SecurityModule { }
```

register.component.ts

```typescript
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({});
  }
}
```

---

## 1.2 Form control

```typescript
ngOnInit() {
  const name = 'JOHN DOE';
  const dateLenght = 10;
  this.formGroup = this.formBuilder.group({
    email: 'john@angular.io',
    name: name.toLowerCase(),
    registeredOn: new Date().toISOString().substring(0, dateLenght),
    password: ''
  });
}
```

---

## 1.3 Form view


```html
<h2>
  User registration
</h2>
<form [formGroup]="formGroup">
  <section>
    <label for="email">E-mail</label>
    <input name="email"
           formControlName="email"
           type="email" />
  </section>
  <section>
    <label for="name">Name</label>
    <input name="name"
           formControlName="name"
           type="text" />
  </section>
  <section>
    <label for="registeredOn">Registered On</label>
    <input name="registeredOn"
           formControlName="registeredOn"
           type="date" />
  </section>
  <section>
    <label for="password">Password</label>
    <input name="password"
           formControlName="password"
           type="password" />
  </section>
</form>
```

---

> Recap:

# 1. Desacople entre vista y modelo

## Form builder

## Form control

## Form view

---

class: impact

# 2. Validación y estados

## Validadores predefinidos y personalizados

## Estados de cambio y validación

---

## 2.1 Validadores predefinidos y personalizados

---

## 2.2 Estados de cambio y validación

---

> Recap:

# 2. Validación y estados

## Validadores predefinidos y personalizados

## Estados de cambio y validación

---

class: impact

# 3. Un gestor de credenciales

## Detección y redirección de intrusos

## Almacenamiento y uso del token

---

## 3.1 Detección y redirección de intrusos

---

## 3.2 Almacenamiento y uso del token

---

> Recap:

# 3.  Un gestor de credenciales

## Detección y redirección de intrusos

## Almacenamiento y uso del token

---

> Next:

# Material design y Angular

## Instalación y comandos

## Layout básico

## Componentes básicos

> **Blog de apoyo:** [Formularios reactivos con Angular](https://academia-binaria.com/formularios-reactivos-con-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
