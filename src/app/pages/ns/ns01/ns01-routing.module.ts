import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns01Component } from './ns01.component';
import { Ns011Component } from './ns011/ns011.component';
import { Ns012Component } from './ns012/ns012.component';
import { Ns013Component } from './ns013/ns013.component';

const routes: Routes = [
  {
    path: '',
    component: Ns01Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns011'
      },
      {
        path: 'ns011',
        component: Ns011Component
      },
      {
        path: 'ns012',
        component: Ns012Component
      },
      {
        path: 'ns013',
        component: Ns013Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns01RoutingModule { }
