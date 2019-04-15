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

  constructor(private converterService: CalculatorService) {}

  ngOnInit() {
    this.convert();
  }

  public convert() {
    this.miles = this.converterService.fromKilometersToMiles(this.kilometers);
  }
}
