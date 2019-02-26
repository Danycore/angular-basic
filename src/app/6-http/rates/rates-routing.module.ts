import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObseratesComponent } from './obserates/obserates.component';
import { RatesComponent } from './rates.component';

const routes: Routes = [
  {
    path: '',
    component: RatesComponent
  },
  {
    path: 'observables',
    component: ObseratesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule {}
