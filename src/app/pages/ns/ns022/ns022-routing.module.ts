import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ns022Component } from './ns022.component';
import { Ns0221Component } from './ns0221/ns0221.component';
import { Ns0222Component } from './ns0222/ns0222.component';
import { Ns0223Component } from './ns0223/ns0223.component';

const routes: Routes = [
  {
    path: '',
    component: Ns022Component,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ns0221'
      },
      {
        path: 'ns0221',
        component: Ns0221Component
      },
      {
        path: 'ns0222',
        component: Ns0222Component
      },
      {
        path: 'ns0223',
        component: Ns0223Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ns022RoutingModule { }
