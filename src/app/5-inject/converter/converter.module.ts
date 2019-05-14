import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AbstractCultureConverterService } from './abstract-culture-converter.service';
import { AmericanCultureConverterService } from './american-culture-converter.service';
import { CalculatorService } from './calculator.service';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter/converter.component';
import { CultureConverterComponent } from './culture-converter/culture-converter.component';
import { EuropeanCultureConverterService } from './european-culture-converter.service';

const cultureConverterFactory = (calculatorService: CalculatorService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeanCultureConverterService(calculatorService);
  } else {
    return new AmericanCultureConverterService(calculatorService);
  }
};

@NgModule({
  declarations: [ConverterComponent, CultureConverterComponent],
  imports: [CommonModule, ConverterRoutingModule, FormsModule],
  providers: [
    {
      provide: AbstractCultureConverterService,
      useFactory: cultureConverterFactory,
      deps: [CalculatorService]
    }
  ]
})
export class ConverterModule {}
