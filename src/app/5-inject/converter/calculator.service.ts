import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private milesPerKilometer = 0.62137;
  private kilometersPerMile = 1.609;
  private boilingFahrenheit = 32;
  private factorC2F = 1.8;
  private factorF2C = 0.5555;
  constructor() {}

  public fromKilometersToMiles = (kilometers: number): number => kilometers * this.milesPerKilometer;

  public fromMilesToKilometers = (miles: number): number => miles * this.kilometersPerMile;

  public fromCelsiusToFahrenheit = (celsius: number): number => celsius * this.factorC2F + this.boilingFahrenheit;

  public fromFahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - this.boilingFahrenheit) * this.factorF2C;
}
