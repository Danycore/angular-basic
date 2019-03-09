import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SecurityRoutingModule } from './security-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, SecurityRoutingModule, ReactiveFormsModule]
})
export class SecurityModule {}
