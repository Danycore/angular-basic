import { Component, OnInit } from '@angular/core';
import { CultureConverterService } from '../culture-converter.service';

@Component({
  selector: 'app-culture-converter',
  templateUrl: './culture-converter.component.html',
  styles: []
})
export class CultureConverterComponent implements OnInit {
  public source: string;
  public target: string;
  public sourceTemperature = 0;
  public targetTemperature: number;
  public sourceDistance = 0;
  public targetDistance: number;
  constructor(private cultureConverterService: CultureConverterService) {}

  public ngOnInit() {
    this.source = this.cultureConverterService.sourceCulture;
    this.target = this.cultureConverterService.targetCulture;
    this.convert();
  }

  public convert() {
    this.convertDistance();
    this.convertTemperature();
  }

  private convertTemperature() {
    this.targetTemperature = this.cultureConverterService.convertTemperature(
      this.sourceTemperature
    );
  }
  private convertDistance() {
    this.targetDistance = this.cultureConverterService.convertDistance(
      this.sourceDistance
    );
  }
}
