import { Injectable } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { ICultureConverter } from './i-culture-converter';

@Injectable()
export class EuropeanCultureConverterService implements ICultureConverter {
  sourceCulture = 'USA';
  targetCulture = 'Europe';

  constructor(private calculatorService: CalculatorService) {}

  public convertDistance = this.calculatorService.fromMilesToKilometers;
  public convertTemperature = this.calculatorService.fromFahrenheitToCelsius;
}
