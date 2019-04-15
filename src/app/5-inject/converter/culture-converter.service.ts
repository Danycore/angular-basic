import { Injectable } from '@angular/core';
import { ICultureConverter } from './culture-converter';

@Injectable({
  providedIn: 'root'
})
export abstract class CultureConverterService implements ICultureConverter {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;
  convertTemperature: (source: number) => number;

  constructor() {}
}
