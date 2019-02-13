import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { CultureConverterComponent } from './culture-converter/culture-converter.component';

const routes: Routes = [
  {
    path: '',
    component: ConverterComponent
  },
  {
    path: 'culture',
    component: CultureConverterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConverterRoutingModule {}
