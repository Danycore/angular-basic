import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './2-spa/heroes/heroes.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./2-spa/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./2-spa/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'car',
    loadChildren: () => import('./4-flow/car/car.module').then(m => m.CarModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./3-data/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'converter',
    loadChildren: () => import('./5-inject/converter/converter.module').then(m => m.ConverterModule)
  },
  {
    path: 'rates',
    loadChildren: () => import('./6-http/rates/rates.module').then(m => m.RatesModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./7-watch/notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./8-reactive/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
