import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemporalModule } from '../1-base/temporal/temporal.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './shell/footer/footer.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [CommonModule, RouterModule, TemporalModule],
  exports: [ShellComponent]
})
export class CoreModule {}
