import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TemporalComponent } from './temporal.component';

@NgModule({
  declarations: [TemporalComponent],
  imports: [CommonModule, SharedModule],
  exports: [TemporalComponent]
})
export class TemporalModule {}
