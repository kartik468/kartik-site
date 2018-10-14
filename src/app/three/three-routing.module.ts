import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Practice1Component } from './practice1/practice1.component';
import { ThreeHomeComponent } from './three-home/three-home.component';
import { Practice2Component } from './practice2/practice2.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeHomeComponent,
    children: [
      {
        path: 'practice1',
        component: Practice1Component
      },
      {
        path: 'practice2',
        component: Practice2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule { }
