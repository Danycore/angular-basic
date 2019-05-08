import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowComponent } from './now/now.component';

@NgModule({
  declarations: [NowComponent],
  imports: [
    CommonModule
  ],
  exports: [NowComponent]
})
export class SharedModule { }
