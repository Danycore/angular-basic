import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStoreService } from '../token-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private tokenStore: TokenStoreService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    const name = 'JOHN DOE';
    const minPassLength = 4;
    this.formGroup = this.formBuilder.group({
      registeredOn: today,
      name: [name.toLowerCase(), Validators.required],
      email: ['john@angular.io', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(minPassLength), this.validatePassword]]
    });
  }

  private validatePassword(control: AbstractControl) {
    const password = control.value;
    let error = null;
    if (!password.includes('$')) {
      error = { ...error, dollar: 'needs a dollar symbol' };
    }
    if (!parseFloat(password[0])) {
      error = { ...error, number: 'must start with a number' };
    }
    return error;
  }

  public register() {
    const loginUrl = 'https://api-base.herokuapp.com/api/pub/credentials/registration';
    const user = this.formGroup.value;
    this.httpClient.post<any>(loginUrl, user).subscribe(res => {
      this.tokenStore.dispatch(res.token);
      this.router.navigate(['security/secret']);
    });
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }
}
