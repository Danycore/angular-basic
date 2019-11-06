import { Injectable } from '@angular/core';
import { AbstractCultureConverterService } from './abstract-culture-converter.service';
import { CalculatorService } from './calculator.service';

@Injectable()
export class AmericanCultureConverterService extends AbstractCultureConverterService {
  sourceCulture = 'Europe';
  targetCulture = 'USA';

  constructor(private calculatorService: CalculatorService) {
    super();
  }

  public convertDistance = this.calculatorService.fromKilometersToMiles;
  public convertTemperature = this.calculatorService.fromCelsiusToFahrenheit;
}
