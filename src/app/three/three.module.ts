import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeRoutingModule } from './three-routing.module';
import { Practice1Component } from './practice1/practice1.component';
import { ThreeHomeComponent } from './three-home/three-home.component';
import { Practice2Component } from './practice2/practice2.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule
  ],
  declarations: [Practice1Component, ThreeHomeComponent, Practice2Component]
})
export class ThreeModule { }
