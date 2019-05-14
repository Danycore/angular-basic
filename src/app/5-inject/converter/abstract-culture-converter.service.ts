import { Injectable } from '@angular/core';
import { ICultureConverter } from './i-culture-converter';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractCultureConverterService implements ICultureConverter {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;
  convertTemperature: (source: number) => number;

  constructor() {}
}
