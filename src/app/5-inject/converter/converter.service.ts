import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor() {}

  public fromKilometersToMiles = (kilometers: number): number =>
    kilometers * 0.62137;

  public fromMilesToKilometers = (miles: number): number => miles * 1.609;

  public fromCelsiusToFarenheit = (celsius: number): number =>
    celsius * (9 / 5) + 32;

  public fromFarenheitToCelsius = (farenheit: number): number =>
    (farenheit - 32) * (5 / 9);
}
