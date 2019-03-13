import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTreeModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ElementsComponent } from './elements/elements.component';
import { SourceComponent } from './source/source.component';

@NgModule({
  declarations: [AppComponent, ShellComponent, HomeComponent, ContactComponent, ElementsComponent, SourceComponent],
  imports: [AppRoutingModule, BrowserModule, NoopAnimationsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTreeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
