import { Injectable } from '@angular/core';
import { ConverterService } from './converter.service';
import { CultureConverter } from './culture-converter';

@Injectable()
export class UsaConverterService implements CultureConverter {
  sourceCulture = 'Europe';
  targetCulture = 'USA';

  constructor(private converterService: ConverterService) {}

  public convertDistance = this.converterService.fromKilometersToMiles;
  public convertTemperature = this.converterService.fromCelsiusToFarenheit;
}
