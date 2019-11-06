import { Injectable } from '@angular/core';
import { AbstractCultureConverterService } from './abstract-culture-converter.service';
import { CalculatorService } from './calculator.service';

@Injectable()
export class EuropeanCultureConverterService extends AbstractCultureConverterService {
  sourceCulture = 'USA';
  targetCulture = 'Europe';

  constructor(private calculatorService: CalculatorService) {
    super();
  }

  public convertDistance = this.calculatorService.fromMilesToKilometers;
  public convertTemperature = this.calculatorService.fromFahrenheitToCelsius;
}
