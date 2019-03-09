import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
}
