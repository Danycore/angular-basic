import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';

@NgModule({
  declarations: [RatesComponent],
  imports: [CommonModule, HttpClientModule, RatesRoutingModule]
})
export class RatesModule {}
