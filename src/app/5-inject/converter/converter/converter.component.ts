import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styles: []
})
export class ConverterComponent implements OnInit {
  public kilometers = 0;
  public miles: number;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.convert();
  }

  public convert() {
    this.miles = this.calculatorService.fromKilometersToMiles(this.kilometers);
  }
}
