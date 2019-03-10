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
    const isValid = null;
    if (!password.includes('$')) {
      return { dollar: 'needs dollar symbol' };
    }
    if (!parseFloat(password[0])) {
      return { number: 'must start with a number' };
    }
    return isValid;
  }

  public register() {
    const user = this.formGroup.value;
    console.log(user);
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
