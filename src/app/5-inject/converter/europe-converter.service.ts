import { Injectable } from '@angular/core';
import { ConverterService } from './converter.service';

@Injectable()
export class EuropeConverterService {
  sourceCulture = 'USA';
  targetCulture = 'Europe';

  constructor(private converterService: ConverterService) {}

  public convertDistance = this.converterService.fromMilesToKilometers;
  public convertTemperature = this.converterService.fromFahrenheitToCelsius;
}
