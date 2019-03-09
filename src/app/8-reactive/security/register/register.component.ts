import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const name = 'JOHN DOE';
    const dateLenght = 10;
    const minPassLength = 4;
    this.formGroup = this.formBuilder.group({
      registeredOn: new Date().toISOString().substring(0, dateLenght),
      name: [name.toLowerCase(), Validators.required],
      email: ['john@angular.io', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(minPassLength), this.validatePassword]]
    });
  }

  private validatePassword(control: AbstractControl) {
    const password = control.value.toISOString();
    const isValid = null;
    if (!password.includes('$')) {
      return 'needs dolar symbol';
    }
    if (!parseFloat(password[0])) {
      return 'must start with a number';
    }
    return isValid;
  }
}
