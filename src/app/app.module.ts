import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeroesComponent } from './2-spa/heroes/heroes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, HeroesComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
