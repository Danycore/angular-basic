import { Injectable } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { ICultureConverter } from './culture-converter';

@Injectable()
export class UsaConverterService implements ICultureConverter {
  sourceCulture = 'Europe';
  targetCulture = 'USA';

  constructor(private converterService: CalculatorService) {}

  public convertDistance = this.converterService.fromKilometersToMiles;
  public convertTemperature = this.converterService.fromCelsiusToFahrenheit;
}
