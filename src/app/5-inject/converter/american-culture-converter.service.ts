import { Injectable } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { ICultureConverter } from './i-culture-converter';

@Injectable()
export class AmericanCultureConverterService implements ICultureConverter {
  sourceCulture = 'Europe';
  targetCulture = 'USA';

  constructor(private calculatorService: CalculatorService) {}

  public convertDistance = this.calculatorService.fromKilometersToMiles;
  public convertTemperature = this.calculatorService.fromCelsiusToFahrenheit;
}
