import { Injectable } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { ICultureConverter } from './culture-converter';

@Injectable()
export class EuropeConverterService implements ICultureConverter {
  sourceCulture = 'USA';
  targetCulture = 'Europe';

  constructor(private converterService: CalculatorService) {}

  public convertDistance = this.converterService.fromMilesToKilometers;
  public convertTemperature = this.converterService.fromFahrenheitToCelsius;
}
