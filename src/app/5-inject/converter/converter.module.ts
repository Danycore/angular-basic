import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterService } from './converter.service';
import { ConverterComponent } from './converter/converter.component';
import { CultureConverterService } from './culture-converter.service';
import { CultureConverterComponent } from './culture-converter/culture-converter.component';
import { EuropeConverterService } from './europe-converter.service';
import { UsaConverterService } from './usa-converter.service';

const cultureFactory = (converterService: ConverterService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeConverterService(converterService);
  } else {
    return new UsaConverterService(converterService);
  }
};

@NgModule({
  declarations: [ConverterComponent, CultureConverterComponent],
  imports: [CommonModule, ConverterRoutingModule, FormsModule],
  providers: [
    {
      provide: CultureConverterService,
      useFactory: cultureFactory,
      deps: [ConverterService]
    }
  ]
})
export class ConverterModule {}
