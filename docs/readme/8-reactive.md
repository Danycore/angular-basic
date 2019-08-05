title: 8-Reactive
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
  loadChildren: () => import('./8-reactive/security/security.module').then(m => m.SecurityModule)
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
---

register.component.ts

```typescript
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

* constructor( private formBuilder: FormBuilder ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm(){
    this.formGroup = this.formBuilder.group({});
  }
}
```

---

## 1.2 Form control

```typescript
private buildForm() {
  const dateLenght = 10;
  const today = new Date().toISOString().substring(0, dateLength);
  const name = 'JOHN DOE';
* this.formGroup = this.formBuilder.group({
    registeredOn: today,
    name: name.toLowerCase(),
    email: 'john@angular.io',
    password: ''
  });
}
```

---

## 1.3 Form view


```html
*<form [formGroup]="formGroup">
  <label for="registeredOn">Registered On</label>
  <input name="registeredOn"
*       formControlName="registeredOn"
        type="date" />
  <label for="name">Name</label>
  <input name="name"
        formControlName="name"
        type="text" />
  <label for="email">E-mail</label>
  <input name="email"
        formControlName="email"
        type="email" />
  <label for="password">Password</label>
  <input name="password"
        formControlName="password"
        type="password" />
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

### Validators

```typescript
private buildForm() {
  const dateLength = 10;
  const today = new Date().toISOString().substring(0, dateLength);
  const name = 'JOHN DOE';
  const minPassLength = 4;
* this.formGroup = this.formBuilder.group({
    registeredOn: today,
    name: [name.toLowerCase(), Validators.required],
    email: ['john@angular.io', [
      Validators.required, Validators.email
    ]],
    password: ['', [
      Validators.required, Validators.minLength(minPassLength)
    ]]
  });
}
```
---
### Validaciones personalizadas

```typescript
password: ['', [
  Validators.required,
  Validators.minLength(minPassLength),
* this.validatePassword
]]
```

--

```typescript
private validatePassword(control: AbstractControl) {
  const password = control.value;
* let error = null;
  if (!password.includes('$')) {
    error = { ...error, dollar: 'needs a dollar symbol' };
  }
  if (!parseFloat(password[0])) {
    error = { ...error, number: 'must start with a number' };
  }
  return error;
}
```

---

## 2.2 Estados de cambio y validación

### Validación general del formulario

```html
<button (click)="register()"
    [disabled]="formGroup.invalid">Register me!</button>
```

```typescript
public register() {
* const user = this.formGroup.value;
  console.log(user);
}
```

---

### Validación particular por control

```typescript
public getError(controlName: string): string {
  let error = '';
  const control = this.formGroup.get(controlName);
* if (control.touched && control.errors != null) {
    error = JSON.stringify(control.errors);
  }
  return error;
}
```

```html
<span>{{ getError('name')}}</span>
<span>{{ getError('email')}}</span>
<span>{{ getError('password')}}</span>
```

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

Servicios

```console
ng g s security/auth-interceptor
ng g c security/secret
```

---

Rutas
```html
  <a routerLink="security/register" class="button">Register</a>
```

```typescript
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'secret',
    component: SecretComponent
  },
  {
    path: '**',
    redirectTo: 'secret'
  }
];
```

---

```typescript
@NgModule({
  declarations: [RegisterComponent, SecretComponent],
  imports: [CommonModule, SecurityRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
*     useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class SecurityModule {}
```

---

Interceptor

```typescript
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError.bind(this)));
  }
  private handleError(err) {
    const unauthorized_code = 401;
    if (err instanceof HttpErrorResponse) {
      if (err.status === unauthorized_code) {
*       this.router.navigate(['security/register']);
      }
    }
    return throwError(err);
  }
}
```

---

## 3.2 Almacenamiento y uso del token

Token Store

```console
ng g s security/token_store
```

```typescript
export class TokenStoreService {
  private token = '';
* private token$ = new BehaviorSubject<string>('');

  constructor() {}

  public select$ = () => this.token$.asObservable();
  public dispatch(token) {
    this.token = token;
    this.token$.next(this.token);
  }
}
```

---


Send credentials and dispatch token

```typescript
public register() {
  const url = 'https://api-base.herokuapp.com/api/pub/credentials/registration';
  const user = this.formGroup.value;
  this.httpClient.post<any>(url, user)
*   .subscribe(res => this.tokenStore.dispatch(res.token));
}
```

---

Get Token en AuthInterceptorService

```typescript
private token = '';
constructor(private router: Router, private tokenStore: TokenStoreService) {
* this.tokenStore.select$()
    .subscribe(token => (this.token = token));
}
```

---

Use Token


```typescript
public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const authHeader = { Authorization: 'bearer ' + this.token };
* const authReq = req.clone({ setHeaders: authHeader });
  return next.handle(authReq)
    .pipe(catchError(this.handleError.bind(this)));
}
```
---

> Recap:

# 3.  Un gestor de credenciales

## Detección y redirección de intrusos

## Almacenamiento y uso del token

---

> Next:

# [Material design y Angular](https://academiabinaria.github.io/angular-basic/readme/9-material.html)

## Instalación y comandos

## Layout básico

## Componentes básicos

> **Blog de apoyo:** [Formularios reactivos con Angular](https://academia-binaria.com/formularios-reactivos-con-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
