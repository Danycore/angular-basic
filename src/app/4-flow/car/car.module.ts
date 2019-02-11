import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car/car.component';
import { DisplayComponent } from './car/display/display.component';
import { PedalsComponent } from './car/pedals/pedals.component';

@NgModule({
  declarations: [CarComponent, DisplayComponent, PedalsComponent],
  imports: [CommonModule, CarRoutingModule]
})
export class CarModule {}
